import { 
  register,
  verify,
  login,
  getUserDetail,
  updateUserInfo,
  changePasswd,
  applyResetPasswd,
  resetPasswd,
  addAuth,
  updateAvatar,
  updateAuth
} from '@src/api';
import {SUCCESS_CODE} from "@src/consts/code"
import SessionStorage from './../storage/sessionStorage';
import Service from "./service"
import history from "@src/history"
class UserService extends Service{
    
    removeLoginStatus(){
      SessionStorage.deleteData("token");
      SessionStorage.deleteData("state");
    }
    get isLogin(){
          let state = SessionStorage.getData("state");
          if(state){
               return state.user.isLogin;
          }
          return false;
    }
    async register(params){
         let result;
          try{
            let res  = await register(params)
            if(res.code === SUCCESS_CODE){
                result = res.message
            }else{
                this.notifyError(res.message)
            }
          }catch(error){
              console.warn(error);
          }
          return result;
    }
    //验证
    async handleVerifyEmail(key){
         let result;
         try {
            result = await verify(key);
         } catch (error) {
             console.warn(error)
         }
        return result; 
    }
    //登录
    async handleLogin(form){
         let isLogin = false;
         try{
             let res  = await login(form)
             if(res.code ===SUCCESS_CODE){
                  const {token} = res.data;
                  //存储token
                  SessionStorage.storeData("token",token)
                  isLogin=true
             }else{
                this.notifyError(res.message)
             }
         }catch(error){
           console.error(error)
         }
         return isLogin
    }
    //用户注销  1. 删除本地token 缓存 
    handleLogout(){
          try{
            this.removeLoginStatus();
            this.routeToUserLogin();
          }catch(error){
              console.log(error)
          }
    }
    //获取用户信息
    async getUserDetail(){
          let userInfo
          try{
             let res = await getUserDetail();
             if(res.code ===SUCCESS_CODE){
                userInfo = res.data;
             }else{
                this.notifyError(res.message)
             }
          }catch(error){
              console.warn(error);
          }
          return userInfo;
    }
    //更新用户信息
    async updateUserInfo(params){
          let isDone = false;
          try{
              const res = await updateUserInfo(params)
              if(res.code ===SUCCESS_CODE){
                    isDone=true;
              }else{
                  this.notifyError(res.message)
              }
               
          }catch(error){
              console.log(error);
          }
          return isDone;
    }
    async handleChangePasswd(form){
      let isDone = false;
      try{
        const res = await changePasswd(form)
        if(res.code ===SUCCESS_CODE){
          //清除登录信息
          this.removeLoginStatus();
          isDone=true;   
        }else{
            this.notifyError(res.message);
        }
      }catch(error){
        console.log(error);
      }
      return isDone;
    }
    //邮箱申请重置密码
    async handleApplyResetPasswd(form){
        let result;
        try{
            const res = await applyResetPasswd(form)
            if(res.code == SUCCESS_CODE){
              result = res.message;
            }else{
              this.notifyError(res.message);
            }
        }catch(error){
          console.log(error);
        }
        return result;
    }
    //重新设置密码
    async handleResetPasswd(params){
        let isDone =false;
        try{
           const res = await resetPasswd(params)
           if(res.code ===SUCCESS_CODE){
              isDone=true;
           }else{
              this.notifyError(res.message);
           }
        }catch(error){
           console.log(error);
        }
        return isDone;
    }
    //添加用户认证
    async handleAddAuth(params){
        let isDone = false;
        try{
           const res = await addAuth(params);
           if(res.code === 0){
              isDone = true;
           }else{
              this.notifyError(res.message);
           }
        }catch(error){
            console.log(error);
        }
        return isDone;
    }
    //更改头像
    async handleUpdateAvatar(params){
        let isDone = false;
        try{
            const res = await updateAvatar(params);
            if(res.code ===SUCCESS_CODE){
                this.notifySucess("头像更换成功")
                isDone = true;
            }else{
                this.notifyError(res.message);
            }
        }catch(error){
          console.log(error);
        }
        return isDone;
    }
    //更新用户认证信息
    async handleUpdateAuth(params){
        let isDone = false;
        try{
           let res =  await updateAuth(params);
           if(res.code !==SUCCESS_CODE){
                this.notifyError(res.message);
           }else{
            isDone=true;
           }
        }catch(error){
          console.log(error);
        }
        return isDone;
    }
  /**
   * 页面跳转
   */
  routeToAdminHome(){
    history.push("/admin/home")
  }
  routeToSendEmail(){
    history.push("/send_email")
  }
  routeToPasswdResult(){
    history.push("/passwd_result")
  }
  routeToUserLogin(){
    history.push("/user/login");
  }
  routeToRegister(){
    history.push("/user/register")
  }
  routeToApplyPasswd(){
    history.push("/user/apply_passwd")
  }
}

export default new UserService();