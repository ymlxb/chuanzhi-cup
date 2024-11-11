import { createRouter, createWebHashHistory } from "vue-router";

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
        path: "/Trade",
        name: "trade",
        component: () => import("@/views/Trade.vue"),
      },
      {
        path: "/Guide",
        name: "guide",
        component: () => import("@/views/Guide.vue"),
      },
      {
        path: "/Mall",
        name: "mall",
        component: () => import("@/views/Mall.vue"),
      },
      {
        path: "/Detail/:id",
        name: "detail",
        component: () => import("@/views/Detail.vue"),
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
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
