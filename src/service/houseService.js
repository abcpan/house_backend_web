import {
  addHouse,
  getHouseList
} from "@src/api"
import Service from "./service"
import {SUCCESS_CODE} from "@src/consts/code"
class HouseService extends Service {
    //添加房产
    async handleAddHouse(params){
        let isDone = false;
        try{
           let res = await addHouse(params);
           if(res.code !==SUCCESS_CODE){
              this.notifyError(res.message);
           }else{
              isDone = true;
           }
        }catch(error){
            console.log(error);
        }
       return isDone;
    }
    //获取房产列表
    async handleGetHouseList(params){
        let page;
        try{
          let res = await getHouseList(params)
          if(res.code ===SUCCESS_CODE){
            page=res.data;
          }else{
            this.notifyError(res.message);
          }
        }catch(error){
          console.log(error);
        }
       return page; 
    }
    
}

export default new HouseService();