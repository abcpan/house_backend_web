import userService from "@src/service/userService"
export const ACTION_SET_IS_REGISTERED = "SET_IS_REGISTERED"
export const ACTION_SET_VERIFY_SCUCESS = "SET_VERIFY_SCUCESS"
export const ACTION_SET_VERIFY_FAIL = "SET_VERIFY_FAIL"
export const ACTION_SET_IS_LOGIN = "SET_IS_LOGIN"
export const ACTION_SET_IS_LOGOUT = "SET_LOGOUT"
export const ACTION_SET_GET_USER_INFO = "SET_GET_USER_INFO"
export const ACTION_SET_IS_APPLY_EMAIL = "SET_IS_APPLY_EMAIL"
export const ACTION_SET_IS_RESET_PASSWD = "SET_IS_RESET_PASSWD"
export const ACTION_SET_IS_CHANGE_PASSWD = "SET_IS_CHANGE_PASSWD"

//将登录状态清空
export function resetLoginStatus(){
  userService.removeLoginStatus();
  return {
      type:ACTION_SET_IS_LOGOUT
  }
  
}
//同步更新信息
function getUserInfoSync(info){
  return {
      type:ACTION_SET_GET_USER_INFO,
      payload:{
          userInfo:info
      }
  }
}
export function register(form){
        return async (dispath)=>{
             let result = await userService.register(form)
             if(result !==undefined){   //不 为undefined  就是成功的
                    dispath({
                        type:ACTION_SET_IS_REGISTERED,
                        payload:{message:result}
                    })
                    userService.routeToSendEmail();
             }else{
              return Promise.resolve()
             }
             
        }
}

export function verifyEmail(params){
        return async (dispath)=>{
              let result = await userService.handleVerifyEmail(params);
              if(result !==undefined){
                  if(result.code ===0){
                    dispath({
                      type:ACTION_SET_VERIFY_SCUCESS,
                      payload:{message:"激活成功"}
                    })
                  }else{
                      dispath({
                        type:ACTION_SET_VERIFY_FAIL,
                        payload:{message:"激活失败"}
                      })
                  }
              }else{
                return Promise.resolve()
              }
              
        }
}

export function login(form){
      return async (dispatch)=>{
            let isLogin = await userService.handleLogin(form);
            if(isLogin){
                dispatch({
                    type:ACTION_SET_IS_LOGIN,
                })
                userService.routeToAdminHome();
            }else{
              return Promise.resolve()
            }
      }
}

//异步更新信息
export function getUserInfo(){
    return async (dispath,getState)=>{
        const {user} = getState();
        if(user && user.userInfo && Object.keys(user.userInfo).length !==0){
            return;
        }else{
          let info = await userService.getUserDetail();
          if(info){
                dispath(getUserInfoSync(info))
          }else{
              return Promise.resolve()
          }
        }
    }
}
//更新用户信息
export function updateUserInfo(params){
    return async (dispatch)=>{
        const isDone = userService.updateUserInfo(params);
        if(isDone){
             //todo: 重新拉取信息
          let info = await userService.getUserDetail();
          if(info){
              dispatch(getUserInfoSync(info))
          }else{
            return Promise.resolve();
          }
        }else{
          return Promise.resolve();
        }
    }
}
//修改密码
export function changePasswd(form){
    return async (dispatch)=>{
        const isDone = await userService.handleChangePasswd(form);
        if(isDone){
              dispatch(resetLoginStatus())
              userService.routeToPasswdResult();
        }else{
            return Promise.resolve();
        }
    }
}
export function applyResetPasswd(form){
    return async(dispatch)=>{
       let result = await userService.handleApplyResetPasswd(form)
       if(result===undefined){
          return Promise.resolve()
       }else{
          dispatch({
              type:ACTION_SET_IS_APPLY_EMAIL,
              payload:{message:result}
          })
          userService.routeToSendEmail();
       }
    }
}
//设置密码
export function resetPasswd(params){
    return async (dispatch)=>{
        const isDone = await userService.handleResetPasswd(params);
        if(isDone){
            dispatch({type:ACTION_SET_IS_RESET_PASSWD})
            userService.routeToPasswdResult();
        }else{
            return Promise.resolve();
        }
    }
}


//异步实名认证
export function addAuth(params){
    return async(dispatch)=>{
        let isDone = await userService.handleAddAuth(params);
        if(isDone){
            //todo: 重新拉取信息
          let info = await userService.getUserDetail();
          if(info){
              dispatch(getUserInfoSync(info))
          }else{
            return Promise.resolve();
          }
        }else{
          return Promise.resolve();
        }
    }
}
//更改头像
export function updateAvatar(params){
    return async(dispatch)=>{
        const isDone = await userService.handleUpdateAvatar(params);
        if(isDone){
           //todo: 重新拉取信息
          let info = await userService.getUserDetail();
          if(info){
              dispatch(getUserInfoSync(info))
          }else{
            return Promise.resolve();
          }
        }else{
          return Promise.resolve();
        }
    }
}


export function updateAuthAsync(params){
  return async (dispatch)=>{
      const isDone = userService.handleUpdateAuth(params);
      if(isDone){
        let info = await userService.getUserDetail();
        if(info){
           dispatch(getUserInfoSync(info))
        }
      }else{
        return Promise.resolve();
      }
  }
}