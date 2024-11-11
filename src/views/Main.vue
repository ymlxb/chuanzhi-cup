<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
</script>

<template>
  <div class="common_layout">
    <el-container class="lay-container">
  <!-- 自定义左侧的组件 -->
      <common-aside/> 
      <el-container>
        <el-header class="el-header">
          <common-header/> 
        </el-header>
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
  .common_layout,.lay-container {
    height: 100%;
  }
  .el-header {
    background-color: #333;
  }
  .right-main {
    padding: 0;
  }
  html,
  body
  #app {
    height: 100%;
  }
</style>