<template>
  <div class="contain">
    <aside></aside>
    <main>
      <div class="wrap">
        <div class="head"></div>
        <div class="detail">
          <h1 class="title">修改商品信息</h1>
          <el-form
            :model="form"
            label-width="auto"
            style="max-width: 60rem;margin: auto;"
            :rules="rules"
            ref="formRef"
          >
            <el-form-item label="物品名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入物品名称(长度在 3 到 20 个字符)" />
            </el-form-item>
            <el-form-item label="出售价格:" prop="price">
              <el-input v-model.number="form.price" placeholder="请输入出售价格" />
            </el-form-item>
           
            <el-form-item label="物品类型:" prop="tag">
              <el-select v-model="form.tag" placeholder="请输入商品类型">
                <el-option
                  v-for="(tagName, index) in tagDataList.value"
                  :key="index"
                  :label="tagName"
                  :value="tagName"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="物品描述:" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                placeholder="请输入物品描述(长度在 20 到 100 个字符)"
              />
            </el-form-item>
            <el-form-item label="联系电话:" prop="mobile">
              <el-input
                v-model="form.mobile"
                placeholder="请输入联系电话"
              />
            </el-form-item>
            <el-form-item label="邮箱地址:" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱地址"
              />
            </el-form-item>
            
           <div class="detail-footer" style="display: flex;justify-content: end;">
            <!-- <el-steps style="min-width: 20rem" :active="active" finish-status="success">
              <el-step title="Step 1" />
              <el-step title="Step 2" />
              <el-step title="Step 3" />
            </el-steps> -->
            <el-button type="primary" round @click="cancel" style="margin-left: 3rem;">取消</el-button>
            <el-button type="primary" round @click="handleSubmit" style="margin-left: 3rem;">保存</el-button>
           </div>
            
          </el-form>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">

import { reactive, ref,onMounted,computed } from "vue";
import {uploadMallImg} from "@/api/api";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { UploadFile } from "element-plus";
import { getAllTag, upCommodity } from "@/api/api";
import { useUserStore } from "@/stores/user";
import { useRouter,useRoute } from "vue-router";
import { baseurl } from "../utils/request";
const router = useRouter();
const route = useRoute();
import type { UploadProps } from 'element-plus'
const userStore = useUserStore();
const token = userStore.userInfo.access_token;
const imageUrl = ref(""); //图片临时地址
// const imageBase64 = ref(""); //图片base64地址
const formRef = ref(null);
const isAvatarLoading = ref(true);
const uploadUrl = computed(() => {
  return `${baseurl}/mall/Commodity/insertImage`;
  // return '/mall/Commodity/insertImage'
});

onMounted(() => {
  getTag();
});

let tagDataList = reactive([]);
// 获取标签
const getTag = async () => {
  await getAllTag().then((res) => {
    tagDataList.value = res.data;
    
    console.log(res.data);
  });
};



const form = reactive({
  id: 0,
  name: "",
  price: 0,
  description: "",
  images: [],
  mobile: "",
  email: "",
  tag: "",
});

form.name = route.query.name
form.price = parseInt(route.query.price) 
form.description = route.query.description
form.mobile = route.query.mobile
form.images = route.query.images
form.email = route.query.email
form.id = route.query.id
form.tag = route.query.tagName


console.log(form.price);




let validateMobile = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if (value === '') {
        callback(new Error('请输入联系电话'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的联系电话'));
      } else {
        callback();
      }
    };

    let validateEmail = (rule, value, callback) => {
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === '') {
        callback(new Error('请输入邮箱地址'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱地址'));
      } else {
        callback();
      }
    };

const rules = {
  name:[
    {required:true,message:"请输入物品名称",trigger:'blur'},
    {min:3,max:20,message:"长度在 3 到 20 个字符",trigger:'blur'}
],
  price: [
          { required: true, message: '请输入出售价格', trigger: 'blur' },
          { type: 'number', message: '价格必须是数字', trigger: 'blur' },
        ],
  tag: [
    {required:true,message:"请输入物品名称",trigger:'blur'},
    ],
  description:[
    {required:true,message:"请输入物品名称",trigger:'blur'},
    {min:20,max:100,message:"长度在 20 到 100 个字符",trigger:'blur'}
],
  mobile: [
          {required:true, validator: validateMobile, trigger: 'blur' }
        ],
  email: [
          {required:true, validator: validateEmail, trigger: 'blur' }
        ],
        // 注意：物品照片的校验规则可能需要根据实际需求进行调整
  
}

// const active = ref(0);
const commodityId = ref('');
// onMounted(() => {
//   getTag();
//   // uploadMallImg()
// });
// const emit = defineEmits(['activeNameChange','publishSuccess']);
// const emitActiveNameChange = () => {
//   emit('activeNameChange', 'image');
// }

// 表单提交
const handleSubmit = async () => {
  formRef.value.validate(async(valid) => {
        if (valid) {
          const res = await upCommodity(form);
          console.log(res);
          if (res.code === 0) {
            ElMessage.success("发布成功");
            commodityId.value = res.data.id;
            // uploadMallImg();
            // emitActiveNameChange();
            // emit('publishSuccess', commodityId.value);
            router.push("/trade");
          } else {
            ElMessage.error("发布失败");
          }
         
        } else {
          console.log('表单验证失败!');
          return false;
        }
      });

}
const cancel = () => {
  router.push("/trade");
};


</script>

<style lang="less" scoped>

.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}



main {
  width: 60%; 
  background-color: #ffffff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  padding: 4rem;
}
.el-form {
  max-width: 60rem;
}

.el-form-item {
  margin-bottom: 2rem;
}

.el-input,
.el-select {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #cccccc;
  padding: 1rem; 
}

.title {
  font-size: 2rem;
  color: #333333;
  margin-bottom: 2rem;
  font-weight: bold;
  text-align: center;
}


.avatar-uploader .avatar {
  width: 17.8rem;
  height: 17.8rem;
  display: block;
}


</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 2.8rem;
  color: #8c939d;
  width: 17.8rem;
  height: 17.8rem;
  text-align: center;
}

.custom-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7); 
  justify-content: center;
  align-items: center;
}

.custom-loading-icon {
  font-size: 3rem; 
  color: #333; 
}
</style>
