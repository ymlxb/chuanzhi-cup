<template>
  <h3 class="show-box-title">基本信息</h3>
  <el-divider content-position="left"></el-divider>
  <el-form>
      
      <el-form-item label="头像：">
        <div class="avatar-wrapper">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <img v-else src="@/assets/images/avatar.jpg" class="avatar">
          <el-upload
            class="avatar-uploader"
            action="/your/upload/api/endpoint"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary">更换头像</el-button>
          </el-upload>
        </div>
      </el-form-item>
    
  </el-form>
</template>

<script setup>
import { ref } from "vue";
import Element from "element-plus";
const avatarUrl = ref("");
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG || isPNG && isLt2M;
};

const handleAvatarSuccess = (response, file, fileList) => {
  avatarUrl.value = response.headUrl;
  Element.Message({
    message: "头像上传成功",
    type: "success",
  });
};
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