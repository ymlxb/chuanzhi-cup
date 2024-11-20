<template>
  <div class="item-login">
    <div class="item-login-wrap">
      <div class="item-login-left">
        <!-- <p class="item-login-left-title">持续生活</p> -->
        <img src="./assets/images/loginImage.png" alt="登录图片" class="item-login-left-image">
      </div>

      <div class="item-login-right">
        <div class="hanging-circle" v-show="showRegisterButton">
          <div class="wire"></div>
          <div class="circle" @click="change">注册</div>
        </div>
        <div class="item-login-right-main">
          <div class="item-login-right-main-title" v-if="state.isLogin">登录</div>
          <div class="item-login-right-main-title" v-else>注册</div>
          <!-- 登录表单 -->
          <el-form  v-if="state.isLogin" label-width="80px" :model="login" :rules="rules" ref="formRef">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="login.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="login.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <!-- <el-form-item label="验证码" prop="captcha">
              <el-space class="item-login-right-main-code">
                <el-input v-model="login.captcha" placeholder="请输入验证码"></el-input>
                <img style="vertical-align: middle; height: 40px; cursor: pointer" :src="state.captchaUrl" @click="onRefreshCode" alt="" />
              </el-space>
            </el-form-item> -->
            <el-form-item label-width="0">
              <el-button type="primary" @click="onLogin" class="item-login-right-main-btn">登录</el-button>
            </el-form-item>
          </el-form>

          <!-- 注册表单 -->
        <el-form v-else label-width="80px" :model="register" :rules="rules" ref="formRef">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="register.confirmPassword" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
          <!-- ... 可以添加更多注册表单项 ... -->
          <el-form-item label-width="0">
            <el-button type="primary" @click="onRegister" class="item-login-right-main-btn">注册</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive,ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { loginApi } from "@/api/api";
import { registerApi } from "@/api/api";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import request from "./utils/request";

const userStore = useUserStore();

const formRef = ref(null);
const router = useRouter();

  const state = reactive({
    isLogin: true,
    captchaUrl: "",
    loading: false,
    year: new Date().getFullYear()
  });
  const login = reactive({ username: "", password: ""});
  const register = reactive({ username: "", password: "", confirmPassword: "" });
  
  
  
  const rules = ref({
  username: [{ required: true, message: ('请输入用户名'), trigger: "blur" },
  {
          validator: (rule, value, callback) => {
            const regex = /^[a-zA-Z0-9]+$/;
            if (!value) {
              callback(new Error('用户名不能为空'));
            } else if (!regex.test(value)) {
              callback(new Error('用户名只能是英文和数字'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }
  ],
  password: [{ required: true, message: ('请输入密码'), trigger: "blur" },
    {min:6,max:15,message:('长度在 6 到 15 个字符'), trigger: "blur"},
  ],
  captcha: [{ required: true, message: ("validate.required"), trigger: "blur" }],
  confirmPassword: [{ required: true, message: ('请再次输入密码'), trigger: "blur" },
  {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== register.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  
});
const {username,password} = login
// const {username,password,uuid,captcha} = register
const showRegisterButton = ref(true);
// 获取form实例做统一校验
  const onLogin = () => {
    formRef.value.validate(async (valid) => {
      console.log(valid);
      
      if (valid) {
       
        await userStore.getUserInfo(login)
       const code = userStore.code;
       console.log(code);
        
        if (code === 0) {
            // 提示用户
            ElMessage({ message: "登录成功", type: "success" });
              // 跳转首页
            router.replace("/home");
        
             } else if (code !== 0) {
              ElMessage({ message: "用户名或密码错误", type: "error" });
             }
        
        
        
    }
   });
  };
  const onRegister = () => {
    
    formRef.value.validate(async (valid) => {
      console.log(valid);
      
      if (valid) {
        registerApi(register).then(res =>{
          console.log(res);
          if(res.code === 0){
            ElMessage({ message: res.msg, type: "success" });
            state.isLogin = true;
          } else {
            ElMessage({ message: res.msg, type: "error" });
          }
        })
        
    }
   });

  };
    const change = () => {
      state.isLogin = !state.isLogin;
      showRegisterButton.value = false; 
    };
   
  

</script>

<style lang="less" scoped>
  .item-login {
    width: 100vw;
    height: 100vh;
    background: #eff1fe;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item-login-wrap {
      margin: 0 auto;
      width: 1000px;
      box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      .item-login-left {
        float: left;
        width: 50%;
      .item-login-left-image {
        width: 100%;
        height: 500px;
      }
    }

    .item-login-right {
      border-left: none;
      color: #fff;
      background-color: #fff;
      width: 50%;
      float: left;

      .hanging-circle {
          position: absolute;
          width: 20px; /* 你可以根据需要调整这个宽度 */
          height: 130px; /* 高度包括线和圆，也可以调整 */
          // margin: 50px auto; /* 居中显示 */
          top: 0;
          right: 60px;
        }

        .hanging-circle .wire {
          position: absolute;
          top: 0;
          right: 5px;
          transform: translateX(-50%);
          width: 4px; /* 线的宽度 */
          height: 80px; /* 线的高度，可以根据需要调整 */
          background-color: #666 /* 线的颜色 */
        }

        .hanging-circle .circle {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px; /* 圆的宽度 */
          height: 50px; /* 圆的高度，保持和宽度一致以形成正圆 */
          border-radius: 50%; /* 设置为50%以形成圆形 */
          background-color: #fff; /* 圆的颜色，可以根据需要调整 */
          border: 2px solid #f5f5dc;
          color: #333;
          font-size: 16px;
          text-align: center;
          line-height: 50px;
          font-weight: bold;
          cursor: pointer;
          display: block;
        }

  .circle:link,
  .circle:visited {
    font-size: 1.6rem;
    // text-decoration: none;
    color: #28b485;
    // display: inline-block;
    // border-bottom: 1px solid #28b485;
    // padding: 3px;
    transition: all .2s;
  }

  .circle:hover {
    background-color: #28b485;
    color:#fff;
    // transform:translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0,0,0,.5);
  }

  .circle:active {
    // transform:translateY(0);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.2);
  }

      .item-login-right-main {
        margin: 0 auto;
        width: 65%;

        .item-login-right-main-title {
          color: #333;
          margin-bottom: 40px;
          font-weight: 500;
          font-size: 24px;
          text-align: center;
          letter-spacing: 4px;
         }
         .el-input__inner {
            border-width: 0;
            border-radius: 0;
            border-bottom: 1px solid #dcdfe6;
          }
          .item-login-right-main-code {
            width: 100%;
            .el-space__item:first-child {
              flex: 1;
            }
          }
          .item-login-right-main-btn {
            width: 100%;
            height: 45px;
            font-size: 18px !important;
            letter-spacing: 2px;
            font-weight: 300 !important;
            cursor: pointer;
            margin-top: 30px;
            font-family: neo, sans-serif;
            transition: 0.25s;
          }
      }
    }
    .item-login-left,
    .item-login-right {
      position: relative;
      min-height: 500px;
      align-items: center;
      display: flex;
    }
    }

    
    
  }
</style>