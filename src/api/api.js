/*
 *  整个项目api的统一管理
 */
import { pa } from "element-plus/es/locales.mjs";
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

// 添加新的收获地址
export const addUserAddress = (address) => {
  return request({
    url: '/sys/address',
    method: 'post',
    data: address
  })
}

// 获取所有收获地址
export const getAllUserAddress = () => {
  return request({
    url: '/sys/address',
    method: 'get'
  })
}

// 修改收获地址
export const upUserAddressById = (address) => {
  return request({
    url: '/sys/address',
    method: 'put',
    data: address
  })
}

// 删除收获地址
export const deleteUserAddressById = (ids) => {
  return request({
    url: '/sys/address',
    method: 'delete',
    params: ids
  })
}
// 通过图片地址获取图片
export const getImageByUrl = (imageUrl) => {
  return request({
    url: `/mall/Commodity/getImageByUrl/${imageUrl}`,
    method: 'get',
  })
}

// 卖家查看自己的商品
export const getListMyCommodity = () => {
  return request({
    url: '/mall/Commodity/listMyCommodity',
    method: 'get',
  })
}

// 卖家修改商品信息
export const upCommodity = (commodity) => {
  return request({
    url: '/mall/Commodity/updateCommodity',
    method: 'put',
    data: commodity
  })
}

// 卖家删除商品
export const deleteCommodity = (id) => {
  return request({
    url: `/mall/Commodity/updateCommodityDelFlag/${id}`,
    method: 'put'
  })
}

/// 获取帖子列表
export const getPosts = (title) => {
  return request({
    url: `/forum/posting/listAllPosting?title=${title}`,
    method: 'get'
  })
}

// 新增帖子
export const addPost = (post) => {
  return request({
    url: '/forum/posting',
    method: 'post',
    data: post
  })
}

//查询帖子
export const getPost = (params) => {
  return request({
    url: '/forum/posting/listMyPosting',
    method: 'get',
    params: params
  })
}


// 获取帖子详情
export const getPostDetail = (postingId) => {
  return request({
    url: `/forum/posting/${postingId}`,
    method: 'get'
  })
}

// 删除帖子
export const deletePost = (postingId) => {
  return request({
    url: `/forum/posting/${postingId}`,
    method: 'delete'
  })
}

// 查询帖子所有回复
export const getPostReply = (postingId) => {
  return request({
    url: `/forum/reply/listPosting/${postingId}`,
    method: 'get'
  })
}

// 查询回复的所有回复
export const getReplyReply = (replyId) => {
  return request({
    url: `/forum/reply/listReplying/${replyId}`,
    method: 'get'
  })
}

// 回复帖子
export const addReply = (reply) => {
  return request({
    url: '/forum/reply',
    method: 'post',
    data: reply
  })
}

// 根据id删除回复
export const deleteReply = (replyId) => {
  return request({
    url: `/forum/reply/${replyId}`,
    method: 'delete'
  })
}


// 查询帖子所有评论
export const getPostComment = (postingId) => {
  return request({
    url: `/forum/comment/listPosting/${postingId}`,
    method: 'get'
  })
}

// 查询回复的所有评论
export const getReplyComment = (replyId) => {
  return request({
    url: `/forum/comment/listReplying/${replyId}`,
    method: 'get'
  })
}

// 添加回复
export const addComment = (comment) => {
  return request({
    url: '/forum/reply',
    method: 'post',
    data: comment
  })
}
// 根据id删除回复
export const deleteComment = (replyId) => {
  return request({
    url: `/forum/reply/${replyId}`,
    method: 'delete'
  })
}

// 获取话题分类
export const getTopics = () => {
  return request({
    url: '/forum/posting/listAllTag',
    method: 'get'
  })
}

//聊天
export const getChatList = (userName) => {
  return request({
    url: `/chat/chatInfo/getAllRecordByUserName/${userName}`,
    method: 'get',

  })
}

//AI聊天
export const getAIChat = (message) => {
  return request({
    url: `/ai/chat/generate?message=${message}`,
    method: 'get',
   
  })
}