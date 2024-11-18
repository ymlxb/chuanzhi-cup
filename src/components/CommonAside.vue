<template>
  <el-aside width="180px">
    <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="false"
      >
      <h3 v-show="!isCollapse">持续生活</h3>
      <h3 v-show="isCollapse">后台</h3>
        <el-menu-item 
          v-for="item in noChildren"
          :index="item.path"
          :key="item.path"
          @click="handleMenu(item)"
        >
          <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
        </el-menu-item>
        <el-sub-menu 
          v-for="item in hasChildren"
          :index="item.path"
          :key="item.path"
        >
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group >
            <el-menu-item 
              v-for="(subItem , subIndex) in hasChildren"
              :index="subItem.path"
              :key="subItem.path"
              @click="handleMenu(subItem)"

            >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{subItem.label}}</span>
          </el-menu-item>
            
          </el-menu-item-group>
          
          
        </el-sub-menu>
        
      </el-menu>
  </el-aside>
</template>

<script setup>
import {ref,computed} from 'vue'
// import { useAllDataStore } from '@/stores/index.js';
import { useRouter } from 'vue-router'
const list =ref([
      	{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house',
          url: '/home'
      	},
        {
            path: '/guide',
            name: 'guide',
            label: '绿色生活指南',
            icon: 'help',
            url: '/guide'
        },
        {
            path: '/brand',
            name: 'brand',
            label: '可持续品牌',
            icon: 'refresh',
            url: '/brand'
        },
        {
            path: '/trade',
            name: 'trade',
            label: '二手交易',
            icon: 'money',                                                              
            url: '/trade'
        },
        // {
        //     path: '/Community',
        //     name: 'Community',
        //     label: '社区论坛',
        //     icon: 'user',
        //     url: '/community'
        // },
        {
            path: '/about',
            name: 'about',
            label: '关于我们',
            icon: 'house',
            url: '/about'
        },
        
        // {
        //     path: 'other',
        //     label: '其他',
        //     icon: 'location',
        //     children: [
        //         {
        //             path: '/page1',
        //             name: 'page1',
        //             label: '页面1',
        //             icon: 'setting',
        //             url: 'Page1'
        //         },
        //         {
        //             path: '/page2',
        //             name: 'page2',
        //             label: '页面2',
        //             icon: 'setting',
        //             url: 'Page2'
        //         }
        //     ]
        // }
])

const noChildren = computed(()=>list.value.filter(item=>!item.children))
const hasChildren = computed(()=>list.value.filter(item=>item.children))
// const store = useAllDataStore()
// const isCollapse = computed(()=>store.state.value.isCollapse)
// console.log(store.state.value.isCollapse);
// // // // // // width
// const width = computed(()=>store.state.value.isCollapse ? '64px' : '180px')
const router = useRouter()
const handleMenu = (item) => {
  // console.log(item);
  router.push({
    path: item.url
  })
}
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
}
.el-aside {
  height: 100%;
  background-color: #545c64;
}
</style>