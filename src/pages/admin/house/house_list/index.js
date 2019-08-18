import React,{
  useEffect
}
from "react"
import {connect} from "react-redux"
import styles from "./index.scss"
import {
  Spin,
  List, 
  Avatar
}from "antd"
import {
  getHosuePageAsync,
  changeSearch
} from "@src/redux/house/actions"
import houseSchema  from '@src/schema/houseSchema';
import {findLabel,findLabelList} from "@src/utils/formatUtil"
import SearchForm from "./components/SearchForm"
const DELETE="delete";
const EDIT ="edit"
const DESHELF = "deshelf"
function HouseList(props){
  const {
    getHosuePageAsync,
    list,
    isLoading,
    params,
    changeSearch,
    totalCount
  }=props;
  useEffect(()=>{
    getHosuePageAsync()
  },[params])
  const handleChange=(kv)=>{
      changeSearch(kv);
  }
  const handleOpera=(type,id)=>{
    switch(type){
      case EDIT:
          return;
      case DELETE:
          return;
      case DESHELF:
          return;
      default:
          return;
    }
  }
    return (
        <div>
            <SearchForm
                onChange={handleChange}
            />
            <List
              loading={isLoading}
              itemLayout="horizontal"
              dataSource={list}
              bordered={true}
              locale={{
                emptyText:"暂无更多数据"
              }}
              pagination={{
                onChange: page => {
                  handleChange({pageNum:page})
                },
                pageSize: 8,
                total:totalCount
              }}
              renderItem={(item)=>
                <List.Item
                  actions={[
                    <span onClick={()=>handleOpera(EDIT,item.houseId)} className={styles.opera}>修改资料</span>,
                    <span onClick={()=>handleOpera(DESHELF,item.houseId)} className={styles.opera}>下架</span>,
                    <span onClick={()=>handleOpera(DELETE,item.houseId)} className={styles.opera}>删除</span>
                ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        src={item.thumb}
                        shape={"square"}
                        size={50}
                      />
                    }
                    title={item.name}
                    description={findLabelList(item.properties,houseSchema.properties.options,"  ")}
                    />
                    <div className={styles.desc}>
                        <span>{houseSchema.price.label}:</span>
                        <span>{item.price}元</span>
                    </div>
                    <div>{findLabel(item.tradeType,houseSchema.tradeType.options)}</div>
                </List.Item>
                
              }
            />
        </div>
    )
}
function mapStateFromProps(state){
    return {
      list:state.house.houseList,
      isLoading:state.house.isLoading,
      params:state.house.params,
      totalCount:state.house.totalCount
    }
}
export default connect(mapStateFromProps,{getHosuePageAsync,changeSearch})(HouseList)