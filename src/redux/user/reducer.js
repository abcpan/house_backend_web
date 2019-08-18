import{
ACTION_SET_VERIFY_SCUCESS,
ACTION_SET_VERIFY_FAIL,
ACTION_SET_IS_LOGIN,
ACTION_SET_IS_LOGOUT,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
ACTION_SET_GET_USER_INFO,
ACTION_SET_IS_APPLY_EMAIL,
ACTION_SET_IS_REGISTERED,
ACTION_SET_IS_RESET_PASSWD,
ACTION_SET_IS_CHANGE_PASSWD
} from './actions';
import {ACTION_RECOVER_DATA} from "../action"
const initState={
        isLogin:false,
        isRegister:false,
        message:"",
        isVerifyEmail:false,
        userInfo:{},
        isApplyResetPasswd:false,  //是否发送密码重置邮件
        isResetPasswd:false,
        isAuth:false,     //是否已经认证
        isChangePasswd:false
}
export function user(state=initState,action){
      const {type,payload} = action
      switch(type){
        case ACTION_SET_IS_REGISTERED:
                return {...state,isRegister:true,...payload}
        case ACTION_SET_VERIFY_SCUCESS:
                return {...state,isVerifyEmail:true,...payload}
        case ACTION_SET_VERIFY_FAIL:
              return {...state,...payload}
        case ACTION_RECOVER_DATA:
              return {...payload.user}
        case ACTION_SET_IS_LOGIN:
              return {...initState,isLogin:true}
        case ACTION_SET_IS_LOGOUT:
              return {...initState}
        case ACTION_SET_GET_USER_INFO:
            const {userInfo} = payload;
            let isAuth = userInfo && userInfo.authInfo?true:false
            return {...state,userInfo,isAuth}
        case ACTION_SET_IS_APPLY_EMAIL:
            return {...state,...payload,isApplyResetPasswd:true}
        case ACTION_SET_IS_RESET_PASSWD:
            return {...initState,isResetPasswd:true}
        case ACTION_SET_IS_CHANGE_PASSWD:
            return {...state,isChangePasswd:true}
        default:
            return state
      }
}