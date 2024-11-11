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
          <button class="search_btn">搜索</button>
        </div>
      </div>
    </header>
  <main>
      <section class="contents">
        <el-card style="width: 100%;border-radius: 1rem;">
          <div class="contents-item">
            <div class="contents-item-box">
              <div class="contents-item--icon margin-left-1" >
                <el-icon><Iphone /></el-icon>
              </div>
              <div class="contents-item--text margin-left-1">
                <a href="">
                  <span class="contents-item--text-title margin-left-1">手机</span>
                </a>
              </div>
              <el-icon class="icon-right"><ArrowRight /></el-icon>
            </div>
            <div class="contents-item-box">
              <div class="contents-item--icon margin-left-1" >
                <el-icon><Monitor /></el-icon>
              </div>
              <div class="contents-item--text margin-left-1">
                <a href="">
                  <span class="contents-item--text-title margin-left-1">笔记本 | 平板</span>
                </a>
              </div>
              <el-icon class="icon-right"><ArrowRight /></el-icon>
            </div>
            <div class="contents-item-box">
              <div class="contents-item--icon margin-left-1" >
                <el-icon><Bicycle /></el-icon>
              </div>
              <div class="contents-item--text margin-left-1">
                <a href="">
                  <span class="contents-item--text-title margin-left-1">交通工具</span>
                </a>
              </div>
              <el-icon class="icon-right"><ArrowRight /></el-icon>
            </div>
            <div class="contents-item-box">
              <div class="contents-item--icon margin-left-1" >
                <el-icon><Printer /></el-icon>
              </div>
              <div class="contents-item--text margin-left-1">
                <a href="">
                  <span class="contents-item--text-title margin-left-1">办公用品</span>
                </a>
              </div>
              <el-icon class="icon-right"><ArrowRight /></el-icon>
            </div>
            <div class="contents-item-box">
              <div class="contents-item--icon margin-left-1" >
                <el-icon><Collection /></el-icon>
              </div>
              <div class="contents-item--text margin-left-1">
                <a href="">
                  <span class="contents-item--text-title margin-left-1">图书</span>
                </a>
              </div>
              <el-icon class="icon-right"><ArrowRight /></el-icon>
            </div>
            <div class="contents-item-box">
              <div class="contents-item--icon margin-left-1" >
                <el-icon><Baseball /></el-icon>
              </div>
              <div class="contents-item--text margin-left-1">
                <a href="">
                  <span class="contents-item--text-title margin-left-1">运动健身</span>
                </a>
              </div>
              <el-icon class="icon-right"><ArrowRight /></el-icon>
            </div>
            <div class="contents-item-box">
              <div class="contents-item--icon margin-left-1" >
                <el-icon><Goods /></el-icon>
              </div>
              <div class="contents-item--text margin-left-1">
                <a href="">
                  <span class="contents-item--text-title margin-left-1">家具家居</span>
                </a>
              </div>
              <el-icon class="icon-right"><ArrowRight /></el-icon>
            </div>
          </div>
          
        </el-card>
      </section>

      <section class="show">
        <el-card style="width: 100%;border-radius: 1rem;">
          <div class="show-item">
            <div class="show-item-nav">
              
                <div class="show-item-nav-box"
                v-for="(item,index) in items" :key="index"
              >
                <span>{{ item.name }}</span>
              </div>
              <PhoneComponent/>
              <LaptopComponent/>
              
              
              <!-- <div class="show-item-nav-box" ><span>闲置物品</span></div>
              <div class="show-item-nav-box" @mouseover="setCurrentComponent('PhoneComponent')"><span>手机</span></div>
              <div class="show-item-nav-box" @mouseover="setCurrentComponent('LaptopComponent')"><span>笔记本</span></div> -->
              <!-- <div class="show-item-nav-box"><span>数码</span></div>
              <div class="show-item-nav-box"><span>图书</span></div>
              <div class="show-item-nav-box"><span>交通</span></div>
              <div class="show-item-nav-box"><span>运动</span></div> -->
            </div>
            <div class="show-item-contain">
              <!-- <component :is="currentComponent"></component> -->
              <!-- <a href="">
                <div class="show-item-box">
                  <img src="../assets/images/404.png" alt="" class="show-item-box-image">
                  <span class="show-item-box-introduction">联想拯救者,几乎全新，因为家里又买了一个多余了，需要出售，可小刀。</span>
                  <span class="show-item-box-price">¥7999.00</span>
                </div>
              </a> -->
              
            </div>
          </div>
        </el-card>
      </section>
    </main>
  </div>

  </template>
  
  <script setup>
    import PhoneComponent from '../components/PetsPlantsComponent.vue';
    import LaptopComponent from '../components/AntiqueJadeComponent .vue';
  import { reactive } from 'vue';
    let items = reactive([
      {
        name:'手机',
        components:'PhoneComponent'
      },
      {
        name:'笔记本',
        components:'LaptopComponent'
      }
    ])
  </script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

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
    height: 4rem;
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

 .show {
    margin-top: 2rem;
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
    font-weight: bold;
 }
 .show-item-nav-box:hover {
    background-color: #98fb98;
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