<template>
  <h3 class="show-box-title">基本信息</h3>
  <el-divider content-position="left"></el-divider>
  <el-form
    :module="form"
    label-width="10rem"
    style="margin-top: 3rem; width: 300px; position: relative;padding: 2rem;"
    :rules="rules"
  >
    <el-form-item label="旧密码：" prop="oldPassword">
      <el-input
        v-model="form.oldPassword"
        type="password"
        show-password
        placeholder="请输入旧密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码：" prop="newPassword">
      <el-input
        v-model="form.newPassword"
        type="password"
        show-password
        placeholder="请输入新密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码：" prop="confirmPassword">
      <el-input
        v-model="form.confirmPassword"
        type="password"
        show-password
        placeholder="请确认新密码"
      ></el-input>
    </el-form-item>
    <div style="position: relative; margin: 2rem">
      <el-button type="primary" class="btn-submit" @click="changePassword">提交</el-button>
    </div>
  </el-form>
  <div v-if="message" :class="{'error':isError,'success':!isError}">
    {{ message }}

  </div>
</template>

<script setup>
import { ref } from "vue";
import { upUserPwd } from "@/api/api";
const message = ref("");
const isError = ref(false);

const form = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const rules = ref({
  oldPassword: [
    { required: true, message: "请输入旧密码", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认新密码", trigger: "blur" },
  ],
  
})

const changePassword = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    message.value ="新密码和确认密码不匹配";
    isError.value = true;
    return;
  }
  const res = await upUserPwd(form.value);
  console.log(res);
  if (res.code === 200) {
    message.value ="修改成功";
    isError.value = false;
} else {
    message.value = "修改失败";
    isError.value = true;

 }
};

</script>

<style lang="less" scoped>
.show-box-title {
  font-size: 3rem;
  margin: 2rem;
}
.btn-submit {
  position: absolute;
  right: 0px;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
