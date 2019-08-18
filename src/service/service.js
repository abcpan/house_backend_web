import {message} from "antd"
import { DURATION } from '@src/consts/index';
export default class Service{
    //通知函数
    notifyError(msg){
      message.error(msg,DURATION)
  }
  //成功通知函数
  notifySucess(msg){
      message.info(msg,DURATION)
  }
}