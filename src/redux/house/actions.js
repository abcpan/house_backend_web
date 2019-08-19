import houseService from "@src/service/houseService"
export const ACTION_GET_HOUSE_LIST = "GET_HOUSE_LIST"
export const ACTION_SET_LOADING = "SET_LOADING"
export const ACTION_SET_SEARCH_CONDITION ="SET_SEARCH_CONDITION"
export const ACTION_SET_DELETE_HOUSE = "SET_DELETE_HOUSE"
export const ACTION_SET_OFF_HOSUE = "SET_OFF_HOSUE"
export const ACTION_SET_ON_HOSUE = "SET_ON_HOUSE"
export const ACTION_SET_HOUSE_DETAIL ="SET_HOUSE_DETAIL"
export const ACTION_UPDATE_HOSUE = "UPDATE_HOUSE"
//获取房产列表--同步
function getHousePageSync(page){
    return {
        type:ACTION_GET_HOUSE_LIST,
        payload:{
          houseList:page.list,
          totalCount:page.totalCount
        }
    }
}
//设置loading 状态
function setLoading(){
    return {
        type:ACTION_SET_LOADING
    }
}
export function getHosuePageAsync(){
    return async(dispatch,getState)=>{
        dispatch(setLoading())
        const {house} = getState();
        const {params} = house;
        let page = await houseService.handleGetHouseList(params);
        if(page !==undefined){
            dispatch(getHousePageSync(page))
        }else{
          dispatch(setLoading())
        }
    }
}

export function changeSearch(params){
    return {
        type:ACTION_SET_SEARCH_CONDITION,
        payload:params
    }
}
function delHouseSync(houseId){
  return {
      type:ACTION_SET_DELETE_HOUSE,
      payload:{
        houseId
      }
  }
}

export function deleteHouseAsync(houseId){
      return async (dispatch)=>{
            dispatch(setLoading())
            let isDone = await houseService.handleDeleteHouse({houseId});
            if(isDone){
                dispatch(delHouseSync(houseId))
            }else{
              dispatch(setLoading())
            }
      }
}
/**
 * 下架房产
 * @param {*} houseId 
 */
function offHouseSync(houseId){
    return {
        type:ACTION_SET_OFF_HOSUE,
        payload:{
          houseId
        }
    }
}
export function offHouseAsync(houseId){
  return async(dispatch)=>{
      dispatch(setLoading())
      let isDone = await houseService.handleOffHouse({houseId})
      if(isDone){
          dispatch(offHouseSync(houseId))
      }else{
        dispatch(setLoading())
      }
  }
}
/**
 * 
 * @param {*} houseId 
 */
function onHouseSync(houseId){
  return {
    type:ACTION_SET_ON_HOSUE,
    payload:{
      houseId
    }
  }
}
export function onHouseAsync(houseId){
  return async(dispatch)=>{
    dispatch(setLoading())
    let isDone = await houseService.handleOnHouse({houseId})
    if(isDone){
      dispatch(onHouseSync(houseId))
    }else{
      dispatch(setLoading())
    }
  }
}
/**
 * 
 * @param {*} detail 
 */
function getHouseDetailSync(detail){
  return {
    type:ACTION_SET_HOUSE_DETAIL,
    payload:{
      houseDetail:detail
    }
  }
}

export function getHouseDetailAsync(houseId){
    return async(dispatch)=>{
      dispatch(setLoading())
      let detail = await houseService.handleGetHouseDetail({houseId})
      if(detail){
        dispatch(getHouseDetailSync(detail))
      }else{
        dispatch(setLoading())
      }
    }
}
/**
 * 
 * @param {*} house 
 * 更新产品
 */
export function updateHouseAsync(house){
    return async(dispatch,getState)=>{
      dispatch(setLoading())
      let isDone = await houseService.handleUpdateHouse(house);
      if(isDone){
        /**
         * 更新后重新拉取列表数据
         */
        const {house} = getState();
        const {params} = house;
        let page = await houseService.handleGetHouseList(params);
        if(page !==undefined){
          dispatch(getHousePageSync(page))
        }
      }else{
          dispatch(setLoading())
      }
    }
}