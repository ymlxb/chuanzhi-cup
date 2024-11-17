<template>
  <h3 class="show-box-title">基本信息</h3>
  <el-divider content-position="left"></el-divider>
  <el-form>
      
      <el-form-item label="头像：">
        <div class="avatar-wrapper">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <img v-else src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="avatar">
          <el-upload
            class="avatar-uploader"
            action="http://10.102.73.64:8081/sys/user/password"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{ Authorization: token }"
            method="put"
          >
            <el-button size="small" type="primary">更换头像</el-button>
          </el-upload>
        </div>
      </el-form-item>
    
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const token = userStore.userInfo.access_token;

import type { UploadProps } from 'element-plus'
const avatarUrl = ref("");
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      console.log('1111');
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
  avatarUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(response);
  
  avatarUrl.value = response.data
  console.log("图片地址", avatarUrl.value);
  
}
</script>

<style lang="less" scoped>

.show-box-title {
  font-size: 3rem;
  margin: 2rem;
}

  // 头像
  .avatar-wrapper {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}

.avatar-uploader {
  display: flex;
  align-items: center;
}
</style>