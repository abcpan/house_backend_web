import {post,get}  from "./request"
import options from "@src/config/request"
import { message} from 'antd';
import {DURATION,AUTH_HEADER} from "@src/consts/index"
import {
  NEED_LOGIN_CODE,
  ILLIGAL_TOKEN_CODE,
  LOGIN_OTHER_CODE,
  SUCCESS_CODE
} from "@src/consts/code"
import SessionStorage from './../storage/sessionStorage';
import userService from '@src/service/userService';
class HTTP{
    constructor(serverOptions){
        this.baseURL = serverOptions.baseURL;
        this.headers = serverOptions.headers;
    }
    post(uri,params,headers={}){
      const path = this.getReqPath(uri);
      const reqHeaders = this.getHeaders(headers);
        return new Promise((resolve,reject)=>{
                post(path,params,reqHeaders).then(res=>{
                    this.handleError(res,(res)=>resolve(res))
                }).catch(error=>{
                    message.error("网络出现故障,请稍后再试",DURATION,()=>reject(error));
                })
        })
    }
    get(uri,params,headers={}){
        const path = this.getReqPath(uri);
        const reqHeaders = this.getHeaders(headers);
        return new Promise((resolve,reject)=>{
                get(path,params,reqHeaders).then(res=>{
                       this.handleError(res,(res)=>resolve(res))
                }).catch(error=>{
                        message.error("网络出现故障,请稍后再试",DURATION,()=>reject(error));
                })
        })
    }
    getHeaders(headers){
          const token = SessionStorage.getData("token")
          if(token){
                this.headers.Authorization = AUTH_HEADER+" "+token
          }
          return Object.assign({},this.headers,headers)
    }
    getReqPath(uri){
          if(uri.startsWith("/")){
            return this.baseURL+uri
          }else{
            return this.baseURL+"/"+uri;
          }
          
    }
    handleError(res,callback){
      const {code } =res;
      switch(code){
        case SUCCESS_CODE:
            callback(res);
            break;
        case NEED_LOGIN_CODE:
            this.redirectLogin("您的登录态已经过期,需要重新登录");
            break;
        case ILLIGAL_TOKEN_CODE:
            this.redirectLogin("非法用户");
            break;
        case LOGIN_OTHER_CODE:
            this.redirectLogin("您的账号已经在别处登录");
            break;
        default:
          callback(res); 
    }
  }
  redirectLogin(msg){
    message.info(msg,DURATION)
    setTimeout(()=>{
      userService.handleLogout();
    },2000);
  }
}

export default new HTTP(options)