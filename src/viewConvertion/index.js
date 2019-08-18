import userBaseSchema from "@src/schema/userBaseSchema.js"
import userAuthSchema from "@src/schema/userAuthSchema.js"
import houseSchema  from '@src/schema/houseSchema';
//转换函数
function getViewList(info,config){
    const map = new Map(Object.entries(config))
    let viewList = []
    for(const [key,value] of Object.entries(info)){
        if(!map.has(key)){
            continue;
        }
        const viewOrigin = map.get(key);
        //如果选项存在
        if(viewOrigin.options){
              let option = viewOrigin.options.find(_=>_.value===value)
              viewList.push({
                label:viewOrigin.label,
                value:option? option.label :value
              })
        }else{
          viewList.push({
            label:viewOrigin.label,
            value:value
          })
        }
        
    }
    return viewList;
}
function sortLabel(viewList){
  viewList.sort((a,b)=>a.index-b.indes)
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

