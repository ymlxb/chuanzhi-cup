<template>
  <div class="contain">
    
    <el-form :model="user" label-width="8rem" style="padding: 2.5rem">
      <el-form-item label="头像：">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="user.username" ></el-input>
      </el-form-item>
      
      <el-form-item label="性别：">
        <el-select
          v-model="user.gender"
          placeholder="请选择性别"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="电话：">
        <el-input v-model="user.mobile" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="user.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <div style=" margin: 2rem;display: flex;justify-content: end;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="emitUserInfo" class="btn-submit"
          >提交</el-button
        >
      </div>
    </el-form>
    
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { upUserInfo } from "@/api/api";
import { useRoute,useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();

onMounted(()=>{
  user.username = route.query.username;
  user.gender = route.query.gender;
  user.mobile = route.query.mobile;
  user.email = route.query.email;
  user.address = route.query.address;

})

const user = reactive({
  username: "",
  image: "",
  email: "",
  mobile: "",
  address: "",
  gender: "",
});

const options = [
  {
    value: 0,
    label: "男",
  },
  {
    value: 1,
    label: "女",
  },
];

const emitUserInfo = async () => {
  const res = await upUserInfo(user);
  if(res.code === 0){
    ElMessage({ message: res.data, type: "success" });
    router.push("/person/userInfo");
  }
 }

 const cancel = () => {
  router.push("/person/userInfo");
 };

</script>



<style scoped>
.contain {
  width: 50%;
}

.show-box-title {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

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
