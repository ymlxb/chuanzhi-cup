<template>
  <h3 class="show-box-title">修改密码</h3>
  <el-divider content-position="left"></el-divider>
  <el-form
    :model="form"
    label-width="10rem"
    style="margin-top: 3rem; width: 600px; position: relative; padding: 2rem"
    :rules="rules"
  >
    <el-form-item label="旧密码：" prop="password">
      <el-input
        v-model="form.password"
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
    <div style="display: flex;justify-content: center; margin: 2rem">
      <el-button type="primary" class="btn-submit" @click="changePassword"
        >提交</el-button
      >
    </div>
  </el-form>
  <div v-if="message" :class="{ error: isError, success: !isError }">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import { upUserPwd } from "@/api/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const message = ref("");
const isError = ref(false);

const form = ref({
  password: "",
  newPassword: "",
  confirmPassword: "",
});

const rules = ref({
  password: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认新密码", trigger: "blur" },
  ],
});

const changePassword = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    message.value = "新密码和确认密码不匹配";
    isError.value = true;
    return;
  }
  const res = await upUserPwd(form.value);
  console.log(res);
  console.log(form.value);
  
  if (res.code === 0) {
    message.value = "修改成功";
    isError.value = false;
    ElMessage({ message: "修改成功", type: "success" });
    router.push('/person/userInfo')
  } else {
    message.value = res.msg;
    isError.value = true;
    ElMessage({ message: res.msg, type: "error" });
    form.value = {
      password: "",
      newPassword: "",
      confirmPassword: "",
    };
  }
};
</script>

<style lang="less" scoped>
.show-box-title {
  font-size: 3rem;
  margin: 2rem;
}
// .btn-submit {
//   position: absolute;
//   right: 250px;
// }
.error {
  color: red;
}
.success {
  color: green;
}
</style>
