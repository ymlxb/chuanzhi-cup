<template>
  <h1 class="title">上传图片</h1>
  <el-form
    :model="form"
    label-width="auto"
    style="max-width: 600px; margin: auto"
  >
    <el-form-item label="物品照片:">
      <el-upload
        class="avatar-uploader"
        :action="`http://10.102.114.166:8081/mall/Commodity/insertCommodityImage/${commodityId}`"
        :headers="{ Authorization: token }"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <div class="detail-footer" style="display: flex; justify-content: end">
      <!-- <el-steps
        style="min-width: 20rem"
        :active="active"
        finish-status="success"
      >
        <el-step title="Step 1" />
        <el-step title="Step 2" />
        <el-step title="Step 3" />
      </el-steps> -->
      <el-button type="primary" round @click="cancel" style="margin-left: 3rem"
        >取消</el-button
      >
      <el-button
        type="primary"
        round
        @click="handleSubmit"
        style="margin-left: 3rem"
        >保存</el-button
      >
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, defineProps, created } from "vue";
// import { uploadMallImg } from "@/api/api";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { UploadFile } from "element-plus";
import { addMallInfo, getAllTag } from "@/api/api";
import { useUserStore } from "@/stores/user";

import { useRouter } from "vue-router";
const userStore = useUserStore();
const token = userStore.userInfo.access_token;

import type { UploadProps } from "element-plus";

const imageUrl = ref(""); //图片临时地址
const name = ref("");
const form = reactive({ image: "" });
// watchEffect(()=>{
//     imageUrl.value=pictureUrl.value;
// })

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const active = ref(1);
const commodityId = ref("");
const props = defineProps({
  commodityId: String,
});

onMounted(() => {
  
  // getTag();
  // uploadMallImg()
  commodityId.value = props.commodityId;
  console.log(props.commodityId);
  console.log(commodityId.value);
});

// 表单提交

const cancel = () => {
  // router.push("/trade");
};

// 上传图片
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  console.log('111');
  // console.log(rawFile);
  
  return true
  console.log('222');
  
}
console.log('333');

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log('333444');
  
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrl.value = response.data
  console.log("图片地址", imageUrl.value);
  
}


</script>

<style lang="less" scoped>
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
