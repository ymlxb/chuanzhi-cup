<template>
  <el-aside width="18rem">
    <el-menu
      mode="horizontal"
      background-color="#333"
      text-color="#fff"
      :collapse="false"
      :default-active="router.currentRoute.value.path"
      class="nav-menu"
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
        <span style="font-size: 1.6rem">{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subItem, subIndex) in hasChildren"
            :index="subItem.path"
            :key="subItem.path"
            @click="handleMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// import { useAllDataStore } from '@/stores/index.js';
import { useRouter } from "vue-router";
const list = ref([
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "house",
    url: "/home",
  },
  {
    path: "/guide",
    name: "guide",
    label: "绿色生活指南",
    icon: "help",
    url: "/guide",
  },
  {
    path: "/brand",
    name: "brand",
    label: "可持续品牌",
    icon: "refresh",
    url: "/brand",
  },
  {
    path: "/trade",
    name: "trade",
    label: "二手交易",
    icon: "money",
    url: "/trade",
  },
  {
    path: "/Community",
    name: "Community",
    label: "社区论坛",
    icon: "user",
    url: "/community",
  },
  {
    path: "/about",
    name: "about",
    label: "关于我们",
    icon: "UserFilled",
    url: "/about",
  },
  
  {
    path: "/Im",
    name: "im",
    label: "聊天室",
    icon: "UserFilled",
    url: "/im",
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
]);

const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));
// const store = useAllDataStore()
// const isCollapse = computed(()=>store.state.value.isCollapse)
// console.log(store.state.value.isCollapse);
// // // // // // width
// const width = computed(()=>store.state.value.isCollapse ? '64px' : '180px')
const router = useRouter();
const handleMenu = (item) => {
  // console.log(item);
  router.push({
    path: item.url,
  });
};
</script>

<style lang="less" scoped>
.icons {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.5rem;
}

.el-menu {
  border-right: none;
  h3 {
    line-height: 4.8rem;
    color: #fff;
    text-align: center;
    font-size: 2rem;
  }
}
.el-aside {
  height: 100vh;
  background-color: #36454f;
}
</style>
