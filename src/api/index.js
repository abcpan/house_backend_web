import http from "../http/index"
/**
 * 
 * 头部不需要添加斜线  
 */
export const uploadImage=(params,headers)=>{
    return http.post("upload/image",params,headers)
}
//注册
export const register=(params)=>{
    return http.post("user/register",params)
}
//登录请求
export const login=(params)=>{
    return http.post("user/login",params)
}

export const verify=(params)=>{
    return http.get("user/verify",params)
}

export const getUserDetail=(param)=>{
    return http.post("user/detail",param)
}
export const updateUserInfo=(params)=>{
    return http.post("user/user_update",params)
}
export const changePasswd=(params)=>{
  return http.post("user/password_change",params)
}
//邮箱申请重置密码
export const applyResetPasswd=(params)=>{
  return http.post("user/password_reset_apply",params)
}
//重置密码
export const resetPasswd=(params)=>{
  return http.post("user/password_reset_verify",params)
}

//添加认证信息
export const addAuth=(params)=>{
    return http.post("user/auth",params);
}
//更新用户信息
export const updateAuth=(params)=>{
  return http.post("user/auth_update",params);
}
//更换头像
export const updateAvatar=(params)=>{
    return http.post("user/avatar_update",params);
}
   
//添加房产
export const  addHouse=(params)=>{
    return http.post("backend/houses/house_add",params);
}

//获取房产列表
export const getHouseList=(params)=>{
  return http.post("backend/houses/house_list",params);
}
