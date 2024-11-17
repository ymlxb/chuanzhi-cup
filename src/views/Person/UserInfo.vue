<!-- <template>
  <div class="contain" style="width: 50%">
    <h3 class="show-box-title">基本信息</h3>
    <el-divider content-position="left"></el-divider>
    <el-form :model="user" label-width="8rem" style="padding: 2.5rem">
      <el-form-item label="用户名：">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      
      <el-form-item label="昵称：">
        <el-input v-model="user.nickname" placeholder="请输入昵称"></el-input>
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
      <div style="position: relative; margin: 2rem">
        <el-button type="primary" @click="userInfo" class="btn-submit"
          >提交</el-button
        >
      </div>
    </el-form>
    <h3 class="show-box-title">头像</h3>
    <el-divider content-position="left"></el-divider>
    <el-form :model="user">
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
      <div style="position: relative; margin: 2rem">
        <el-button type="primary" @click="userInfo" class="btn-submit"
          >提交</el-button
        >
      </div>
    </el-form>
  </div>
</template> -->
<template>
  
  <el-form :model="userData" label-width="8rem" style="padding: 2.5rem;margin: 0 20px;width: 70%;">
    <div class="button-group">
      <el-button type="warning" class="button-group-item" @click="editInfo">修改</el-button>
      <el-button  @click="clock" class="button-group-item">关闭</el-button>
    </div>
    <div class="UserInfo" >
      <el-form-item label="头像：">
        <div style="text-align: center">
          <el-avatar v-if="userData.headUrl" :src="userData.headUrl" />
          <el-avatar v-else src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
      </el-form-item>
      <el-form-item label="用户名：">
        {{ userData.username }}
      </el-form-item>
      <el-form-item label="性别：">
        <!-- <el-select
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
        </el-select> -->
        {{ userData.gender ? '女' : '男' }}
      </el-form-item>

      <el-form-item label="电话：">
        <!-- <el-input v-model="user.mobile" placeholder="请输入电话"></el-input> -->
        {{ userData.mobile }}
      </el-form-item>
      <el-form-item label="邮箱：">
        <!-- <el-input v-model="user.email" placeholder="请输入邮箱"></el-input> -->
        {{ userData.email }}
      </el-form-item>
      <!-- <el-form-item label="地址：">
        <el-input v-model="user.address" placeholder="请输入地址"></el-input>
        {{ userData.address }}
      </el-form-item> -->
    </div>
  </el-form>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getUserInfo } from "@/api/api";
import { useRouter } from "vue-router";
const router = useRouter();
const userData = reactive({
  // username: "",
  // email: "",
  // mobile: "",
  // address: "",
  // gender: "",
  // headUrl: "",
});
// const user = reactive({
//   username: "",
//   image: "",
//   nickname: "",
//   email: "",
//   mobile: "",
//   address: "",
//   gender: "",
// });
// const value = ref("");

// const options = [
//   {
//     value: 0,
//     label: "男",
//   },
//   {
//     value: 1,
//     label: "女",
//   },
// ];
onMounted(() => {
  userInfo();
});
const userInfo = async () => {
  const res = await getUserInfo();
  console.log(res.data);
  Object.assign(userData, res.data);
  // console.log(userData);
};

const editInfo = () =>{
  router.push({
    path:"/person/editUserInfo",
    query: {
      username: userData.username,
      email:userData.email,
      mobile:userData.mobile,
      address:userData.address,
      gender:userData.gender,
    },
  });
}

</script>

<style scoped lang="less">

.button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 0px;
    justify-content: flex-end;
.button-group-item{
  height: 40px;
  width: 80px;
}
}

/* 头像 */
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>

<!-- <style scoped>
.btn-submit {
  position: absolute;
  right: 0px;
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
</style> -->
