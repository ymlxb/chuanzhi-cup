<template>
  <div class="contain">
    <header class="header">
      <div class="navigation">
        <a href="##" class="link">
          <span class="text">手机</span>
        </a>
        <a href="##" class="link">
          <span class="text">平板 | 笔记本</span>
        </a>
        <a href="##" class="link">
          <span class="text">交通工具</span>
        </a>
        <a href="##" class="link">
          <span class="text">家电</span>
        </a>
        <a href="##" class="link">
          <span class="text">图书</span>
        </a>
        <div class="search">
          <input type="text" class="search_input"  placeholder="笔记本电脑"></input>
          <button class="search_btn" @click="search">搜索</button>
        </div>
      </div>
    </header>
   
    <section class="main">
      <el-card class="left" style="width: 10%;margin-right: 2rem;" shadow="always">
      <div class="account" style="margin-bottom: 2rem;">
        <h2 class="title">我的账户</h2>
        <p class="title-nav"><router-link to="/person/userInfo">个人中心</router-link></p>
        <p class="title-nav"><router-link to="/person/upAddress">收货地址</router-link></p>
        <p class="title-nav"><router-link to="/person/upAvatar">修改头像</router-link></p>
        <p class="title-nav"><router-link to="/person/upPassWord">修改密码</router-link></p>
      </div>
      <div class="order">
        <h2 class="title">交易管理</h2>
        <p class="title-nav">我的订单</p>
      </div>
    </el-card>
    <el-card class="right" style="width: 80%;" shadow="always">
      <router-view></router-view>
    </el-card>
    </section>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
  .contain {
    width: 140rem;
    margin: auto;
    
  }

  .main {
    display: flex;
    justify-content: center;
  }

  .header {
    width:100rem;
    height: 8rem;
    margin: auto;
    padding:2rem 10rem;

  }

  .navigation {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .text {
    color:#333;
    cursor: pointer;
    font-size: 1.8rem;
  }
  .text:hover {
    color: #98fb98;
  }

  .search_input {
    padding: .8rem;
    height: 2.4rem;
    width: 30rem;
    border: 1px solid #e0e0e0;
    // color:#f5f5dc
  }
  .search_input:focus {
    outline: none;
    border-color:#98fb98;
  }

  .search_btn {
    height: 4rem;
    width: 6rem;
    border: 1px solid #e0e0e0;
    cursor: pointer;

  }

  .title {
    font-size: 1.8rem;
    color:#333;
    line-height: 2;
  }
  .title-nav {
    font-size: 1.4rem;
    color:#D3D3D3;
    margin: 1.5rem;
  }
</style>