<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small">
        <component class="icons" is="menu"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>区域管理</el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item>街道管理</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown >
        <span class="el-dropdown-link">
          <img v-if="avatar" :src="avatar" class="user">
          <img v-else src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="user">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><router-link to="/person/userInfo">个人中心</router-link></el-dropdown-item>
            <el-dropdown-item @click="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
  </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {ref,computed} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user';
import {useRouter} from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const avatar = ref('')
avatar.value = userStore.userAvatarUrl
console.log(avatar.value);

import {logoutApi}  from '@/api/api'
const exit = ()=>{
  ElMessageBox.confirm(
    '是否确定退出？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      console.log('退出登录');
      // 清除用户信息，触发action
      
      // 跳转到登录页
      router.push('/login')
      logoutApi().then((res) => {
        console.log(res);
      })
      userStore.clearUserInfo()
      ElMessage({
        type: 'success',
        message: '退出成功',
        
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出',
      })
    })
}
// const getImageUrl = (user)=>{
//   return new URL(`../assets/images/${user}.png`,import.meta.url)
// }
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons {
  width: 2rem;
  height: 2rem;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 2rem;
  }
}
.r-content {
  .user {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #fff;
  }
}
:deep(.bread span){
  color: #fff !important;
  cursor: pointer !important;
}
</style>