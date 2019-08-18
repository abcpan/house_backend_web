import { 
  ACTION_GET_HOUSE_LIST,    //设置房产列表
  ACTION_SET_LOADING_LIST,  //设置加载状态
  ACTION_SET_SEARCH_CONDITION  //设置搜索条件
} from './actions';
import houseSchema from '@src/schema/houseSchema';
const initState={
    isLoading:true,
    houseList:[],
    params:{
        pageNum:1,
        pageSize:6,
        sort:houseSchema.priceSort.defaultValue,
        name:"",
        tradeType:houseSchema.tradeType.defaultValue,
        state:houseSchema.state.defaultValue
    }
}
export function house(state=initState,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_GET_HOUSE_LIST:
          const {totalCount,houseList} = payload
          return {...state,isLoading:false,houseList,totalCount}
        case ACTION_SET_LOADING_LIST:
          return {...state,isLoading:true}
        case  ACTION_SET_SEARCH_CONDITION:
          return {...state,params:Object.assign({},state.params,payload)}
        default:
          return state;
    }
}