import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi} from "@/api/api";


export const useUserStore = defineStore("user", () => {
  // 定义管理用户数据的state
  const userInfo = ref({})
  const userAvatarUrl = ref("")
 const code = ref('')
 const username = ref('')
  // 定义获取接口数据的action函数
  const getUserInfo = async (login) =>{
    const res = await loginApi(login);
    console.log(res);
    
    userInfo.value = res.data;
    code.value = res.code;
    // console.log(code.value);
    console.log(userAvatarUrl.value);
    
  }
  

  
  // const setUserAvatar = async (userAvatar) =>{
  //   userAvatarUrl.value = userAvatar;
  //   console.log(userAvatar.value);
    
  // }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {};
  }

  // 以对象的格式把state和action return出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    code,
    // setUserAvatar,
    userAvatarUrl,
  }
  
},{
  persist: true,
},);
