import {
  uploadImage
}from "@src/api"
import {message} from "antd"
import { DURATION } from '@src/consts/index';
class UploadService{
    async uploadBybase64(base64){
          let url;
          try{
            let res = await uploadImage({base64})
            if(res.code !==0){
                message.error("图片上传失败,请稍后再试",DURATION)
            }else{
               url = res.data;
            }
          }catch(error){
              console.log(error);
          }
         return url;
    }
}
export default new UploadService();