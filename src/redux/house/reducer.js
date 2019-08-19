import { 
  ACTION_GET_HOUSE_LIST,    //设置房产列表
  ACTION_SET_LOADING,  //设置加载状态
  ACTION_SET_SEARCH_CONDITION,  //设置搜索条件
  ACTION_SET_DELETE_HOUSE,   //删除房产
  ACTION_SET_OFF_HOSUE,
  ACTION_SET_ON_HOSUE,
  ACTION_SET_HOUSE_DETAIL   //房产详情
} from './actions';
import {OFF_SALE,ON_SALE} from "@src/consts/index"
const initState={
    isLoading:false,
    houseList:[],
    totalCount:0,
    params:{
        pageNum:1,
        pageSize:6,
        sort:null,
        name:"",
        tradeType:null,
        state:null
    },
    houseDetail:{}
}
export function house(state=initState,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_GET_HOUSE_LIST:
          const {totalCount,houseList} = payload
          return {
            ...state,
            isLoading:!state.isLoading,
            houseList,
            totalCount
          }
        case ACTION_SET_LOADING:
          return {
            ...state,
            isLoading:!state.isLoading
          }
        case  ACTION_SET_SEARCH_CONDITION:
          return {...state,params:Object.assign({},state.params,payload)}
        case ACTION_SET_DELETE_HOUSE:
            return {
              ...state,
              houseList:state.houseList.filter(_=>_.houseId !==payload.houseId),
              totalCount:--state.totalCount,
              isLoading:!state.isLoading
            }
        case ACTION_SET_OFF_HOSUE:
          return {
            ...state,
            isLoading:!state.isLoading,
            houseList:state.houseList.map(_=>{
              if(_.houseId ===payload.houseId){
                  _.state =OFF_SALE
              }
              return _
            }),
          }

        case ACTION_SET_ON_HOSUE:
          return {
            ...state,
            isLoading:!state.isLoading,
            houseList:state.houseList.map(_=>{
              if(_.houseId ===payload.houseId){
                  _.state =ON_SALE
              }
              return _
            }),
          }
        case ACTION_SET_HOUSE_DETAIL:
          return {
            ...state,
            ...payload,
            isLoading:!state.isLoading
          }
        default:
          return state;
    }
}