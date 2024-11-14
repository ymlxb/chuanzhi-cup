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
    <section class="show">
        <el-card style="width: 100%;border-radius: 1rem;">
          <div class="show-item">
            <div class="show-item-select" >
              <el-dropdown>
                <div class="show-item-select-time" @mouseover="changeIcon('time',true)" @mouseleave="changeIcon('time',false)">
                  新发布<el-icon><component :is="timeIcon"/></el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>1天内</el-dropdown-item>
                    <el-dropdown-item>3天内</el-dropdown-item>
                    <el-dropdown-item>7天内</el-dropdown-item>
                    <el-dropdown-item>14天内</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown>
                <div class="show-item-select-price" @mouseover="changeIcon('price',true)" @mouseleave="changeIcon('time',false)">
                  价格<el-icon><component :is="priceIcon"/></el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>价格从低到高</el-dropdown-item>
                    <el-dropdown-item>价格从高到低</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="show-item-contain">
              <div class="show-item-box" v-for="item in newList" :key="item.id"  >
                  <router-link :to="`/Detail/${item.id}`">
                    <img :src="item.image" alt="" class="show-item-box-image">
                    <span class="show-item-box-introduction">{{item.description}}</span>
                    <span class="show-item-box-price">¥{{ item.price }}</span>
                  </router-link>
                </div>
            </div>
          </div>
        </el-card>
      </section>
  </div>
</template>

<script setup>

import { searchMallInfoByName } from "@/api/api";
import { onMounted,ref,onUnmounted, } from "vue";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";
import { ElMessage } from "element-plus";
const route = useRoute();
const newList = ref(null);
const name = ref(route.query.name || "");
const timeIcon=ref('ArrowDown')
const priceIcon=ref('ArrowDown')

    const searchData = () => {
      if (name.value.trim()) { // 确保有搜索关键词,并去除前后空格
        searchMallInfoByName({name:name.value}).then((res) => {
          if(res.code === 0){
            console.log(res);
            newList.value = res.data.list;
          } else {
            ElMessage({message:res.msg,type:"error"});
          } // 更新响应式数据
        }).catch((error) => {
          console.error('搜索失败:', error);
        });
      }
    };
    const search = () => {
      let name = document.querySelector('.search_input').value;
      if (name.trim()) { // 去除前后空格
        searchMallInfoByName({name:name}).then((res) => {
          if(res.code === 0){
            console.log(res);
            newList.value = res.data.list;
          } else {
            ElMessage({message:res.msg,type:"error"});
          }
        }).catch((error) => {
          console.error('搜索失败:', error);
        });
      }
    };
// 监听路由变化以更新 name
const routeWatcher = watchEffect(() => {
      if(route.query.name !== name.value){
        name.value = route.query.name || "" ;
        searchData();
      }
    });


    onMounted(() => {
      // console.log(name.value); 
      searchData(); 
    });

    // 清理函数
    onUnmounted(() => {
      routeWatcher(); // 停止监听路由变化，避免内存泄漏
    });

    const changeIcon = (type,isHovering) => {
      if(type === 'time'){
        timeIcon.value = isHovering ? 'ArrowUp' : 'ArrowDown';
        console.log('time',timeIcon.value);
        
       } else if (type === 'price') {
        priceIcon.value = isHovering ? 'ArrowUp' : 'ArrowDown';
       }
      }
</script>

<style lang="less" scoped>
  .contain {
    background-color: #f7f7f7;
    font-family: "Lato", sans-serif;
    box-sizing: border-box;
    font-size: 1.6rem;
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

  .contents, .show {
    width: 125rem;
    margin: auto;
    // padding-bottom: 10rem;
 }

 .contents-item {
    width: 21rem;
    height: 30rem;
    background-color: #d3d3d3;
    border-radius: 1rem;
    padding: 1rem;
 }

 .contents-item-box {
    display: flex;
    margin-bottom: 2rem;
 }

 .contents-item--text {
    width: 100%;
    height: 100%;
 }

 .contents-item--text-title:hover {
    color: #98FB98;
 }

 .margin-left-1 {
    margin-left: .5rem;
 }

 .icon-right {
    right: 1rem;
 }

 .toolbar {
  position: fixed;
  top: 30rem;
  right: 5rem;
  width: 5rem;
  height: 5rem;
  background-color: #FFFFFF;
  z-index: 999;
  border-radius: 1rem;
 }

 .toolbar-item--icon {
    width: 5rem;
    height: 3rem;
    margin-right: .5rem;
 }

 .show {
    margin-top: 2rem;
 }

 .show-item-select {
  margin-left: 5rem;
  display: flex;
  justify-content: flex-start;
 }
 .show-item-select-time,
 .show-item-select-price {
    width: 10rem;
    height: 4rem;
    margin-right: 2rem;
    cursor: pointer;
    background-color: #d3d3d3;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 .show-item-select-time:hover,
 .show-item-select-price:hover {
    background-color: #98fb98;
    border:none;
 }

 .show-item-nav {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 2rem;
    z-index: 999;
 }

 .show-item-nav-box {
    width: 10rem;
    height: 4rem;
    margin-right: 2rem;
    cursor: pointer;
    background-color: #d3d3d3;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 .show-item-nav-box:first-child {
    background-color: #98fb98;
    
 }
 .show-item-nav-box:active {
    background-color: #98fb98;
    font-weight: bold;
 }

 .show-item-contain {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

 }

 .show-item-box {
    width: 24rem;
    border: 1px solid transparent;
    padding: .5rem;
    border-radius: 2rem;
    overflow: hidden;
    transition: all .5s ease;
    box-shadow: 0 0 0 0 rgba(0,0,0,.3);
 }
 .show-item-box:hover {
    box-shadow: 0 1rem 2rem rgba(0,0,0,.3);
    transform: translateY(-5px);
 }

 .show-item-box-image {
    width: 100%;
    height: 24rem;
    border-radius: 2rem;
    
 }

 .show-item-box-introduction {
    display: inline-block;
    margin-top: 1rem;
    color:#333;
    line-height: 1.5;
    padding: 0 .8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%; /* 或者设置一个具体的宽度，如200px */
    max-height: 3em;
    margin-bottom: 2rem;
 }

 .show-item-box-price {
    width: 100%;
    color:#98fb98;
    font-size: 3rem;
    display: inline-block;
    text-align: center;
    margin-bottom: 1.5rem;
 }

</style>