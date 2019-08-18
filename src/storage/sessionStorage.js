export default class SessionStorage{
      static getData(key){
          let data = sessionStorage.getItem(key);
          if(data ===undefined || data ===null){
              return null;
          }else{
              return JSON.parse(data);
          }
      }
      static storeData(key,data){
           let currentData = sessionStorage.getItem(key);
           if(currentData){
                sessionStorage.removeItem(key);
           }
           let targetData = JSON.stringify(data);
           sessionStorage.setItem(key,targetData)
      }
      static deleteData(key){
            let currentData = sessionStorage.getItem(key);
            if(currentData){
                sessionStorage.removeItem(key);
            }
      }
}