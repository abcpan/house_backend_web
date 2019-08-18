import houseService from "@src/service/houseService"
export const ACTION_GET_HOUSE_LIST = "GET_HOUSE_LIST"
export const ACTION_SET_LOADING_LIST = "SET_LOADING_LIST"
export const ACTION_SET_SEARCH_CONDITION ="SET_SEARCH_CONDITION"
function getHousePageSync(page){
    return {
        type:ACTION_GET_HOUSE_LIST,
        payload:{
          houseList:page.list,
          totalCount:page.totalCount
        }
    }
}
export function getHosuePageAsync(){
    return async(dispatch,getState)=>{
        dispatch({
            type:ACTION_SET_LOADING_LIST
        })
        const {house} = getState();
        const {params} = house;
        let page = await houseService.handleGetHouseList(params);
        if(page !==undefined){
            dispatch(getHousePageSync(page))
        }else{
          return Promise.resolve();
        }
    }
}

export function changeSearch(params){
    return {
        type:ACTION_SET_SEARCH_CONDITION,
        payload:params
    }
}
