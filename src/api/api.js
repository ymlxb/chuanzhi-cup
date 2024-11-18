/*
 *  整个项目api的统一管理
 */
import request from "../utils/request";

// 登录
export const loginApi = (login) => {
  return request({
    url: "/sys/admin/login",
    method: "post",
    data:login
  })
  // .then(res => {
  //     const token = res.data.token;
  //     localStorage.setItem('userToken', token);
  //   return token;
  // });
};

// 注册
export const registerApi = ({ username, password }) => {
  return request({
    url: "/sys/admin/register",
    method: "post",
    data: {
      username,
      password,
    },
  });
}

// 退出
export const logoutApi = () => {
  return request({
    url: "/sys/admin/logout",
    method: "post",
  });
};



// 根据商品ID获取商品信息
export const getMallInfoById = (id) => {
  return request({
    url: `/mall/Commodity/getCommodityInfo/${id}`,
    method: "get",
  });
};

// 获取全部商品
export const getAllMallInfo = () => {
  return request({
    url: "/mall/Commodity/listAllCommodity",
    method: "get",
  });
};

// 卖家添加商品
export const addMallInfo = (form) => {
  return request({
    url: "/mall/Commodity/insertCommodity",
    method: "post",
    data:form
  });
};

// 上传商品图片
export const uploadMallImg = (commodityId,imageFile) => {
  const formData = new FormData();
  formData.append('image',imageFile)
  return request({
    url: `/mall/Commodity/insertCommodityImage/${commodityId}`,
    method: "post",
    data:formData
  });
};

// 查询商品 根据商品名称获取指定商品
export const searchMallInfo = (name) => {
  return request({
    url: "/mall/Commodity/listCommodityByName",
    method: "get",
    params:name
  });
};

// 获取所有标签
export const getAllTag = () => {
  return request({
    url: "/mall/Commodity/listAllTag",
    method: "get"
  });
};

// 根据商品名称获取指定商品
export const searchMallInfoByName = (name) => {
  return request({
    url: "/mall/Commodity/listCommodityByName",
    method: "get",
    params:name
  });
};

// 根据商品标签获取指定商品
export const searchMallInfoByTag = ({tag,number}) => {
  return request({
    url: "/mall/Commodity/listCommodityByTag",
    method: "get",
    params:{tag,number}
  });
};

// 获取所有商品
export const getAllMallInfoApi = () => {
  return request({
    url: "/mall/Commodity/listAllCommodity",
    method: "get"
  })
}

// 删除指定商品
export const deleteMallInfoById = (id) => {
  return request({
    url: `/mall/Commodity/deleteCommodity/${id}`,
    method: 'post'
  })
}

// 获取用户信息（个人信息）
export const getUserInfo = () => {
  return request({
    url: '/sys/user',
    method: 'get',
 
  })
}

// 修改用户信息
export const upUserInfo = (user) => {
  return request({
    url: '/sys/user',
    method: 'put',
    data: user
  })
}

// 修改密码
export const upUserPwd = (password) => {
  return request({
    url: '/sys/user/password',
    method: 'put',
    params: password
  })
}

// 修改地址
export const upUserAddress = (address) => {
  return request({
    url: '/sys/user/address',
    method: 'put',
    data: address
  })
}

// 修改头像
export const upUserAvatar = (imageFile) => {
  const formData = new FormData();
  formData.append('image',imageFile)
  return request({
    url: '/sys/user/updateImage',
    method: 'put',
    data: imageFile
  })
}
