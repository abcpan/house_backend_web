import userBaseSchema from "@src/schema/userBaseSchema.js"
import userAuthSchema from "@src/schema/userAuthSchema.js"
import houseSchema  from '@src/schema/houseSchema';
//转换函数
function getViewList(info,config){
    if(typeof info !=="object" || !config ||Object.keys(info).length ===0){
        return []
    }
    const map = new Map(Object.entries(config))
    let viewList = []
    for(const [key,value] of Object.entries(info)){
        if(!map.has(key)){
            continue;
        }
        if(typeof value !=="string" && typeof value !=="number"){
          continue;
        }
        const viewOrigin = map.get(key);
        //如果选项存在
        if(viewOrigin.options){
              let option = viewOrigin.options.find(_=>_.value===value)
              viewList.push({
                label:viewOrigin.label,
                value:option? option.label :value,
                index:viewOrigin.index
              })
        }else{
          viewList.push({
            label:viewOrigin.label,
            value:value,
            index:viewOrigin.index
          })
        }
        
    }
    return viewList;
}
function sortLabel(viewList){
  viewList.sort((a,b)=>a.index-b.index)
}
//排序处理
export function getUserBaseInfoView(info,config=userBaseSchema){
    let viewList = getViewList(info,config)
    //排序处理
    sortLabel(viewList)
    return viewList
}
//翻译用户认证信息
export function getUserAuthInfoView(info,config=userAuthSchema){
    const newInfo = JSON.parse(JSON.stringify(info))
    const {location} = newInfo;
    const{provinceName,cityName,countyName} =location;
    const locationStr = [provinceName,cityName,countyName].join("-")
    let viewList = getViewList(newInfo,config)
    //筛掉头像 和地址数据
    let newViewList = viewList.filter(_=>{
        return _.label !== config.avatar.label && _.label !==config.location.label
    })
    //重新加入地址数据
    newViewList.push({
        label:userAuthSchema.location.label,
        value:locationStr
    })
    return newViewList
}

export function getHouseDetailView(info,config=houseSchema){
    if(typeof info !=="object" || Object.keys(info).length ===0){
        return {}
    }
    let viewList = getViewList(info,config);
    //组装地址
    let {location,images,properties,floorplans} = info;
    let {provinceName,cityName,countyName} = location
    let position = [provinceName,cityName,countyName].join("-")
    viewList.push({
        label:config["location"].label,
        value:position,
        index:config["location"].index
    })
    //组装属性
    let props = properties.map(_=>{
        let option = config["properties"].options.find(item=>item.value == _)
        if(option){
          return option.label;
        }
    })
    //弄成字符串
    viewList.push({
        label: config["properties"].label,
        value:props.join("-"),
        index: config["properties"].index
    })
    sortLabel(viewList)
    return {
      list:viewList,
      images,
      floorplans
    }
}

