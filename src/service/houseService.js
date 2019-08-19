import {
  addHouse,
  getHouseList,
  deleteHouse,
  offHouse,
  onHouse,
  getHouseDetail
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
    //删除房产
    async handleDeleteHouse(params){
      let isDone = false;
      try{
          let res = await deleteHouse(params);
          if(res.code ==SUCCESS_CODE){
            isDone = true;
          }else{
            this.notifyError(res.message);
          }
      }catch(error){
        console.log(error);
      }
      return isDone;
    }
    //下架房产
    async handleOffHouse(params){
      let isDone = false;
      try{
          let res = await offHouse(params);
          if(res.code ===SUCCESS_CODE){
              isDone= true;
          }else{
              this.notifyError(res.message);
          }
        }catch(error){
          console.log(error);
        }
      return isDone
    }
    //上架房产
    async handleOnHouse(params){
      let isDone = false;
      try{
          let res = await onHouse(params);
          if(res.code ===SUCCESS_CODE){
              isDone= true;
          }else{
              this.notifyError(res.message);
          }
        }catch(error){
          console.log(error);
        }
      return isDone
    }
    //获取单个房产详情
    async handleGetHouseDetail(params){
      let detail;
      try{
        let res = await getHouseDetail(params);
        if(res.code ===SUCCESS_CODE){
            detail=res.data
        }else{
            this.notifyError(res.message);
        }
      }catch(error){
        console.log(error);
      }
      return detail
    }
}

export default new HouseService();