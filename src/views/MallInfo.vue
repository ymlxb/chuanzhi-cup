<template>
  <div class="contain">
    <aside></aside>
    <main>
      <div class="wrap">
        <div class="head"></div>
        <div class="detail">
          <h1 class="title">发布闲置物品</h1>
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
                <!-- <el-option v-for="(tagName,index) in tagDataList" :key="index" label="tagName" :value="tagName"></el-option> -->
                <el-option
                  v-for="(tagName, index) in tagDataList.value"
                  :key="index"
                  :label="tagName"
                  :value="tagName"
                />
                <!-- <el-option label="笔记本|平板" value="laptop" />
                <el-option label="数码" value="idle" />
                <el-option label="图书" value="book" />
                <el-option label="交通" value="traffic" />
                <el-option label="运动" value="sport" /> -->
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
            <el-form-item label="物品照片:" prop="images">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="{ Authorization: token }"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
              <div v-if="isAvatarLoading" class="custom-loading-overlay">
                <el-icon type="loading" class="custom-loading-icon"></el-icon>
              </div>
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <div class="action-buttons">
              <el-button 
                type="info" 
                round 
                @click="cancel"
                class="btn-cancel"
              >
                <i class="el-icon-close"></i> 取消发布
              </el-button>
              <el-button 
                type="primary" 
                round 
                @click="handleSubmit"
                class="btn-submit"
              >
                <i class="el-icon-check"></i> 立即发布
              </el-button>
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
import { addMallInfo, getAllTag,getImageByUrl } from "@/api/api";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { baseurl } from "../utils/request";
const router = useRouter();

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
const form = reactive({
  name: "",
  price: "",
  description: "",
  tag: "",
  images: [],
  mobile: "",
  email: "",
});
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
  images: [
          { required:true, message: '请上传物品照片', trigger: 'blur' }
        ]
}

// const active = ref(0);
const commodityId = ref('');
onMounted(() => {
  getTag();
  // uploadMallImg()
});
// const emit = defineEmits(['activeNameChange','publishSuccess']);
// const emitActiveNameChange = () => {
//   emit('activeNameChange', 'image');
// }

// 表单提交
const handleSubmit = async () => {
  formRef.value.validate(async(valid) => {
        if (valid) {
          const res = await addMallInfo(form);
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

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      console.log('1111');
      isAvatarLoading.value = true
      if (rawFile.type !== 'image/jpeg'&& rawFile.type !== 'image/png' && rawFile.type !== 'image/jfif') {
        ElMessage.error('图片必须是jpg,png或jfif格式')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB')
        return false
      }
      console.log('444');
      
  return true
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log('333444');
  isAvatarLoading.value = false
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrl.value = response.data
  // getImageUrl()
  form.images.push(imageUrl.value)
  console.log("图片地址", imageUrl.value);
  
}
// const getImageUrl = async () => {
//   await getImageByUrl(imageUrl.value).then((res) => {
//     console.log("图片地址", res.data);
//     imageBase64.value = res.data;
//   });
// };

let tagDataList = reactive([]);
// 获取标签
const getTag = async () => {
  await getAllTag().then((res) => {
    tagDataList.value = res.data;
    // tagDataList.forEach((item) => {
    //   console.log(item);
    // });
    console.log(res.data);

    // console.log(tagDataList.value);
  });
};
// import { onMounted, reactive } from "vue";
// import {uploadMallImg} from "@/api/api";
// import { ref } from "vue";

// // 图片上传

// import type { TabsPaneContext } from 'element-plus'
// import MallInfo from "../components/MallInfo.vue";
// import MallImage from "../components/MallImage.vue";
// const activeName = ref('info')
// const state =ref(false)
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
//   activeName.value = 'info'

// }

// const updateActiveName = (value: string) => {
//   activeName.value = value;
//   state.value = true;
// }

// const currentCommodityId = ref('');

// const updateCommodityId = (id: string) => {
//   currentCommodityId.value = id;
//   console.log('当前商品id', id);
//   console.log(currentCommodityId.value);
//   console.log('当前商品id', currentCommodityId);
  
  
// };

</script>

<style lang="less" scoped>
@primary-color: #409EFF;
@secondary-color: #67C23A;
@background-color: #f8f9fa;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}


/* 主内容区域样式 */
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
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
}


/* 上传照片样式 */
.avatar-uploader .avatar {
  width: 17.8rem;
  height: 17.8rem;
  display: block;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 40px;

  .btn-cancel {
    padding: 12px 28px;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;

    &:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
    }
  }

  .btn-submit {
    padding: 12px 28px;
    background: linear-gradient(135deg, @primary-color 0%, darken(@primary-color, 10%) 100%);
    border: none;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(@primary-color, 0.3);
    }
  }
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
  background-color: rgba(255, 255, 255, 0.7); /* 半透明白色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-loading-icon {
  font-size: 3rem; /* 或者根据需要设置其他大小 */
  color: #333; /* 或者根据需要设置其他颜色 */
}
</style>
