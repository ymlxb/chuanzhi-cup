<template>
  <div class="contain">
    <aside></aside>
    <main>
      <div class="wrap">
        <div class="head"></div>
        <div class="detail">
          <h1 class="title">发布物品</h1>
          <el-form
            :model="form"
            label-width="auto"
            style="max-width: 600px;margin: auto;"
          >
            <el-form-item label="物品名称:">
              <el-input v-model="form.name" placeholder="请输入物品名称" />
            </el-form-item>
            <el-form-item label="出售价格:">
              <el-input v-model="form.price" placeholder="请输入出售价格" />
            </el-form-item>
            <el-form-item label="物品类型:">
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
            <el-form-item label="物品描述:">
              <el-input
                v-model="form.description"
                type="textarea"
                placeholder="请输入物品描述"
              />
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input
                v-model="form.mobile"
                placeholder="请输入联系电话"
              />
            </el-form-item>
            <el-form-item label="邮箱地址:">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱地址"
              />
            </el-form-item>
            <el-form-item label="物品照片:">
              <el-upload
                class="avatar-uploader"
                action="http://10.102.114.166:8081/mall/Commodity/insertImage"
                :headers="{ Authorization: token }"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
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

import { reactive, ref,onMounted } from "vue";
import {uploadMallImg} from "@/api/api";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { UploadFile } from "element-plus";
import { addMallInfo, getAllTag } from "@/api/api";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();

import type { UploadProps } from 'element-plus'
const userStore = useUserStore();
const token = userStore.userInfo.access_token;
const imageUrl = ref(""); //图片临时地址

const form = reactive({
  name: "",
  price: "",
  description: "",
  tag: "",
  images: [],
  mobile: "",
  email: "",
});

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
};

const cancel = () => {
  router.push("/trade");
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
 
  return true
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log('333444');
  
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrl.value = response.data
  form.images.push(imageUrl.value)
  console.log("图片地址", imageUrl.value);
  
}


let tagDataList = reactive([]);
// 获取标签
const getTag = async () => {
  await getAllTag().then((res) => {
    tagDataList.value = res.data;
    tagDataList.forEach((item) => {
      console.log(item);
    });
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
/* 基础样式 */

/* 整体布局样式 */
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 视口高度 */
  background-color: #f5f5f5; /* 背景颜色 */
}

/* 侧边栏样式 */
// aside {
//   width: 20%; /* 宽度 */
//   background-color: #ffffff; /* 背景颜色 */
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
//   padding: 20px; /* 内边距 */
// }

/* 主内容区域样式 */
main {
  width: 60%; /* 宽度 */
  background-color: #ffffff; /* 背景颜色 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 40px; /* 内边距 */
}
.el-form {
  max-width: 600px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input,
.el-select {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #cccccc;
  padding: 10px; 
}

.title {
  font-size: 2rem;
  color: #333333;
  margin-bottom: 2rem;
  font-weight: bold;
  text-align: center;
}

/* 上传照片样式 */
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
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
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
