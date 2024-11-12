import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 这个resolve是添加的别名
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
  server: {
    open: true, // 自动启动浏览器
    host: "0.0.0.0", // localhost
    port: 8001, // 端口号
    hmr: { overlay: false }
  }
});
