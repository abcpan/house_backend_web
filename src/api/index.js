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
    return http.post("backend/user/user_register",params)
}
//登录请求
export const login=(params)=>{
    return http.post("backend/user/user_login",params)
}

export const verify=(params)=>{
    return http.get("backend/user/user_verify",params)
}

export const getUserDetail=(param)=>{
    return http.post("backend/user/user_detail",param)
}
export const updateUserInfo=(params)=>{
    return http.post("backend/user/user_update",params)
}
export const changePasswd=(params)=>{
  return http.post("backend/user/user_passwd_change",params)
}
//邮箱申请重置密码
export const applyResetPasswd=(params)=>{
  return http.post("backend/user/user_passwd_reset_apply",params)
}
//重置密码
export const resetPasswd=(params)=>{
  return http.post("backend/user/user_passwd_reset_verify",params)
}

//添加认证信息
export const addAuth=(params)=>{
    return http.post("backend/user/user_auth",params);
}
//更新用户信息
export const updateAuth=(params)=>{
  return http.post("backend/user/user_auth_update",params);
}
//更换头像
export const updateAvatar=(params)=>{
    return http.post("backend/user/user_avatar_update",params);
}
   
//添加房产
export const  addHouse=(params)=>{
    return http.post("backend/houses/house_add",params);
}

//获取房产列表
export const getHouseList=(params)=>{
  return http.post("backend/houses/house_list",params);
}
//删除
export const deleteHouse=(params)=>{
  return http.post("backend/houses/house_del",params)
}
//下架房产
export const offHouse=(params)=>{
  return http.post("backend/houses/house_off",params)
}
//上架房产
export const onHouse=(params)=>{
  return http.post("backend/houses/house_on",params)
}
//获取单个房产详情
export const getHouseDetail=(params)=>{
  return http.post("backend/houses/house_detail",params)
}

//跟新房产信息
export const updateHouse=(params)=>{
  return http.post("backend/houses/house_update",params)
}

