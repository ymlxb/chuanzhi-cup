<template>
  <div class="contain">
    <aside></aside>
    <main>
      <div class="wrap">
        <div class="head"></div>
        <div class="detail">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="商品信息" name="info"><MallInfo @activeNameChange="updateActiveName" @publishSuccess="updateCommodityId"/></el-tab-pane>
            <el-tab-pane label="商品图片" name="image"><MallImage :commodityId="currentCommodityId"/></el-tab-pane>
          </el-tabs>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import {uploadMallImg} from "@/api/api";
import { ref } from "vue";

// 图片上传

import type { TabsPaneContext } from 'element-plus'
import MallInfo from "../components/MallInfo.vue";
import MallImage from "../components/MallImage.vue";
const activeName = ref('info')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  activeName.value = 'info'

}

const updateActiveName = (value: string) => {
  activeName.value = value;
}

const currentCommodityId = ref('');

const updateCommodityId = (id: string) => {
  currentCommodityId.value = id;
};

</script>

<style lang="less" scoped>
/* 基础样式 */

/* 整体布局样式 */
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 视口高度 */
  background-color: #f5f5f5; /* 背景颜色 */
}

/* 侧边栏样式 */
// aside {
//   width: 20%; /* 宽度 */
//   background-color: #ffffff; /* 背景颜色 */
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
//   padding: 20px; /* 内边距 */
// }

/* 主内容区域样式 */
main {
  width: 60%; /* 宽度 */
  background-color: #ffffff; /* 背景颜色 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 40px; /* 内边距 */
}


</style>
