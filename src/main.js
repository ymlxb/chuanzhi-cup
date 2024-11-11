import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import "@/assets/less/index.less";
import router from "./router";
// 全局注册图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 完整引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// import "@/api/mock.js";
// import api from "@/api/api";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

// app.config.globalProperties.$api = api;
app.use(ElementPlus);
app.use(pinia);
app.use(router).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
