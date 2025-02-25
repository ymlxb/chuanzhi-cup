import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

// 制定路由规则

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/brand",
        name: "brand",
        component: () => import("@/views/Brand.vue"),
      },
      {
        path: "/community",
        name: "community",
        component: () => import("@/views/Community.vue"),
      },
      {
        path: "/About",
        name: "about",
        component: () => import("@/views/About.vue"),
      },
      {
        path: "/trade",
        name: "trade",
        component: () => import("@/views/Trade.vue"),
      },
      {
        path: "/Guide",
        name: "guide",
        component: () => import("@/views/Guide.vue"),
      },
      {
        path: "/Trade",
        redirect: "/trade",
      },
      {
        path: "/EditMall",
        name: "editMallInfo",
        component: () => import("@/views/EditMallInfo.vue"),
      },
      {
        path: "/Mall",
        name: "mallInfo",
        component: () => import("@/views/MallInfo.vue"),
      },
      {
        path: "/Detail/:id",
        name: "detail",
        component: () => import("@/views/Detail.vue"),
      },
      {
        path: "/Search",
        name: "search",
        component: () => import("@/views/Search.vue"),
      },
      {
        path: "/Person",
        name: "person",
        component: () => import("@/views/Person.vue"),
        children: [
          {
            path: "UserInfo",
            name: "userInfo",
            component: () => import("@/views/Person/UserInfo.vue"),
          },
          {
            path: "UserOrder",
            name: "userOrder",
            component: () => import("@/views/Person/UserOrder.vue"),
          },
          {
            path: "UpAddress",
            name: "upAddress",
            component: () => import("@/views/Person/UpAddress.vue"),
          },
          {
            path: "UpAvatar",
            name: "upAvatar",
            component: () => import("@/views/Person/UpAvatar.vue"),
          },
          {
            path: "UpPassWord",
            name: "upPassWord",
            component: () => import("@/views/Person/UpPassWord.vue"),
          },
          {
            path: "EditUserInfo",
            name: "editUserInfo",
            component: () => import("@/views/Person/EditUserInfo.vue"),
          },
          {
            path: "SelfPublish",
            name: "selfPublish",
            component: () => import("@/views/Person/SelfPublish.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const elMain = document.querySelector(".el-main");
  elMain && elMain.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  next();
});
export default router;
