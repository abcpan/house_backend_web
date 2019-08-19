import React,{
  useEffect,
  useState,
  useCallback
}
from "react"
import {connect} from "react-redux"
import styles from "./index.scss"
import {
  Spin,
  List, 
  Avatar,
  Popconfirm
}from "antd"
import {
  getHosuePageAsync,
  changeSearch,
  deleteHouseAsync,
  offHouseAsync,
  onHouseAsync,
  updateHouseAsync
} from "@src/redux/house/actions"
import houseSchema  from '@src/schema/houseSchema';
import {findLabel,findLabelList} from "@src/utils/formatUtil"
import SearchForm from "./components/SearchForm"
import { ON_SALE,OFF_SALE } from './../../../../consts/index';
import HouseDetailModal from "./components/DetailModal"
import HouseEditModal from "./components/EditModal"
const DELETE="delete";
const EDIT ="edit"
const SALE = "sale"
const DETAIL = "detail"
function HouseList(props){
  const {
    getHosuePageAsync,
    list,
    isLoading,
    params,
    changeSearch,
    totalCount,
    deleteHouseAsync,
    offHouseAsync,
    onHouseAsync,
    updateHouseAsync
  }=props;
  const [isShowDetail,setIsShowDetail] = useState(false);
  const [isShowHouseEditModal,setIsShowHouseEditModal] = useState(false);
  const [currentHosue,setCurrentHouse] =useState({})
  useEffect(()=>{
    getHosuePageAsync()
  },[params])
  const handleChange=(kv)=>{
      changeSearch(kv);
  }
  const handleOpera=(type,houseId,extra)=>{
    switch(type){
      case EDIT:
          let updateHouse = list.find(_=>_.houseId===houseId);
          setCurrentHouse(updateHouse)
          setIsShowHouseEditModal(pre=>!pre);
          break 
      case DELETE:
          deleteHouseAsync(houseId);
          break;
      case SALE:
          if(extra===ON_SALE){
            offHouseAsync(houseId);
          }
          if(extra===OFF_SALE){
            onHouseAsync(houseId)
          }
          break;
      case DETAIL:
          let detailHouse = list.find(_=>_.houseId===houseId);
          setCurrentHouse(detailHouse)
          setIsShowDetail(pre=>!pre);
          break 
      default:
          return;
    }
  }
  //修改房产详细信息

    const handleUpdateHouse=(form)=>{
      let {houseId} = currentHosue;
      form.houseId = houseId
      updateHouseAsync(form);
      setIsShowHouseEditModal(pre=>!pre)
    }
    return (
        <div>
            <SearchForm
                onChange={handleChange}
                params={params}
            />
            <List
              className={styles.list}
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
                    <span onClick={()=>handleOpera(DETAIL,item.houseId)} className={styles.opera}>查看详细</span>,
                    <span onClick={()=>handleOpera(EDIT,item.houseId)} className={styles.opera}>修改资料</span>,
                    <Popconfirm
                        onConfirm={()=>handleOpera(SALE,item.houseId,item.state)}
                        onCancel={()=>{}}
                        title={item.state===ON_SALE?"确认要下架么":"确定上上架么"}
                        okText="确定"
                        cancelText="取消"
                    >
                     <span className={styles.opera}>{item.state===ON_SALE?"下架":"上架"}</span>
                   </Popconfirm>,
                    <Popconfirm
                        onConfirm={()=>handleOpera(DELETE,item.houseId)}
                        onCancel={()=>{}}
                        title="确认要删除么"
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className={styles.opera}>删除</span>
                    </Popconfirm>
                    
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
            <HouseDetailModal
              visible={isShowDetail}
              handleOk={()=>setIsShowDetail(pre=>!pre)}
              handleCancel={()=>setIsShowDetail(pre=>!pre)}
              info ={currentHosue}
            />
            <HouseEditModal
              visible={isShowHouseEditModal}
              handleOk={handleUpdateHouse}
              handleCancel={()=>setIsShowHouseEditModal(pre=>!pre)}
              info={currentHosue}
            />
        </div>
    )
}
function mapStateFromProps(state){
    return {
      list:state.house.houseList,
      isLoading:state.house.isLoading,
      params:state.house.params,
      totalCount:state.house.totalCount,
      houseDetail:state.house.houseDetail,
    }
}
export default connect(mapStateFromProps,{
  getHosuePageAsync,
  changeSearch,
  deleteHouseAsync,
  offHouseAsync,
  onHouseAsync,
  updateHouseAsync
})(HouseList)