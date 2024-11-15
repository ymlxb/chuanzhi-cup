import { ElMessage } from "element-plus";
import axios from "axios";
import { useUserStore } from "@/stores/user";

const instance = axios.create({
  baseURL: "http://192.168.144.243:8081",
  timeout: 30 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    //     // 从pinia中获取token
    const userStore = useUserStore();
    console.log("1");

    // 按照后端的要求拼接token数据
    const token = userStore.userInfo.access_token; 
    console.log(token);
    
    if (token) {
      config.headers.Authorization = `${token}`;
      console.log("token");
      
    }
    return config;
  },
  (error) => {
    console.log("请求拦截器");

    return Promise.reject(new Error(error));
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log("2");
    return res.data;

    const { code, message, data } = res.data;
    if (code == 200) {
      return data;
    } else {
      const NETWORK_ERROR = "网络错误";
      console.log("响应");

      ElMessage.error(message || NETWORK_ERROR);
      return Promise.reject(new Error(message || NETWORK_ERROR));
    }
  },
  (error) => {
    console.log("3");
    return Promise.reject(error);
  }
);
function request(options) {
  options.method = options.method || "GET";
  return instance(options);
}

function getToken() {
  return token;
}

export default request;
export { getToken };
