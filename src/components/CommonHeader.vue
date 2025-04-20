<template>
  <div class="header">
          <!-- logo和名称 -->
    <div class="logo-container">
        <img src="../assets/images/Logo.png" alt="logo" class="logo" />
        <h1 class="site-name">绿脉永续</h1>
      </div>
    <el-menu
      mode="horizontal"
      background-color="#333"
      text-color="#fff"
      :collapse="false"
      :default-active="router.currentRoute.value.path"
      class="nav-menu"
    >
      <el-menu-item
        v-for="item in list"
        :index="item.path"
        :key="item.path"
        @click="handleMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span style="font-size: 1.6rem">{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
    <!-- 右侧用户信息 -->

    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img v-if="avatar" :src="avatar" class="user" />
          <img
            v-else
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            class="user"
          />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              ><router-link to="/person/userInfo"
                >个人中心</router-link
              ></el-dropdown-item
            >
            <el-dropdown-item @click="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const avatar = ref("");
// avatar.value = userStore.userAvatarUrl;
// console.log(avatar.value);
getUserInfo().then((res) => {
  // console.log(res);
  if (res.code == 0) {
    avatar.value = res.data.headImage;
  } else {
    ElMessage({
      type: "error",
      message: "获取用户信息失败",
    });
  }
});
import { logoutApi, getUserInfo } from "@/api/api";

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
    path: "/CarbonFootprint",
    name: "CarbonFootprint",
    label: "碳足迹",
    icon: "Stamp",
    url: "/CarbonFootprint",
  },
  
  {
    path: "/im",
    name: "im",
    label: "聊天室",
    icon: "chatDotRound",
    url: "/im",
  },{
    path: "/ai",
    name: "ai",
    label: "AI助手",
    icon: "Monitor",
    url: "/ai",
  },
  {
    path: "/about",
    name: "about",
    label: "关于我们",
    icon: "UserFilled",
    url: "/about",
  },
]);

// const noChildren = computed(() => list.value.filter((item) => !item.children));
// const hasChildren = computed(() => list.value.filter((item) => item.children));
// const store = useAllDataStore()
// const isCollapse = computed(()=>store.state.value.isCollapse)
// console.log(store.state.value.isCollapse);
// // // // // // width
// const width = computed(()=>store.state.value.isCollapse ? '64px' : '180px')

const handleMenu = (item) => {
  // console.log(item);
  router.push({
    path: item.url,
  });
};
const exit = () => {
  ElMessageBox.confirm("是否确定退出？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await logoutApi();
        // console.log(res);

        if (res.code === 0) {
          userStore.clearUserInfo();
          ElMessage({
            type: "success",
            message: "退出成功",
          });

          router.push("/login");
        } else {
          ElMessage.error(res.message || "退出失败");
        }
      } catch (error) {
        console.error("退出失败:", error);
        ElMessage.error("退出失败,请重试");
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消退出",
      });
    });
};
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
  .nav-menu {
    flex: 1;
    min-width: 50rem;
  }
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 2rem;
  // padding: 0 1rem;
  min-width: 14rem;

  .logo {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    display: block;
  }

  .site-name {
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    white-space: nowrap;
  }
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
.user-info {
  margin-left: auto;
  padding: 0 20px;
  .user {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #fff;
  }
}
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
:deep(.el-menu--horizontal) {
  border-bottom: none;
}

:deep(.el-menu-item) {
  display: flex;
  align-items: center;
}

// 修复链接样式
:deep(.router-link-active) {
  text-decoration: none;
  color: inherit;
}
</style>
