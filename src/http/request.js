import axios from "axios"
const instance = axios.create()
instance.interceptors.request.use(
    config=>{
      return config;
    },
    error=>{
       return Promise.reject(error)
    }
)
//响应拦截
instance.interceptors.response.use(
  res=>{
    return Promise.resolve(res.data);
  },
  //请求已经发出但是不在200范围内
  error=>{
    return Promise.reject(error);
  }
)
function addHeader(headers){
    for(const [key,value] of Object.entries(headers)){
      instance.defaults.headers.common[key]=value
    }
  }
//导出post 请求
export function post(path,params,headers={}){
            addHeader(headers)
            return new Promise((resolve,reject)=>{
                    instance.post(path,params).then(data=>{
                        resolve(data)
                    })
                    .catch(error=>{
                        reject(error);
                    })
            })
}

export function get(path,params,headers={}){
        addHeader(headers)
        return new Promise((resolve,reject)=>{
        instance.get(path,{params:params}).then(data=>{
            resolve(data)
        })
        .catch(error=>{
            reject(error);
        })
    })
}
