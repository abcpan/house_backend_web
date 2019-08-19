import React,{
  memo
}from "react"
import {
  Modal
}from "antd"
import HouseForm from "../../../components/HouseForm"
import {transTypeFromList} from "@src/utils/formatUtil"
function EditModal(props){
    const handleGetData=(value)=>{
        props.handleOk(value);
    }
    const {info} = props;
    //翻译信息
    let initData ={}
    if(Object.keys(info).length !==0){
        let {name,tradeType,location,address,price,area,beds,baths,properties,remarks,images,floorplans} =info;
        initData = {name,tradeType,address,price,area,beds,baths,properties,remarks,images,floorplans}
        //组装地址信息
        let {provinceId,cityId,countyId} = location;
        initData.location = transTypeFromList([provinceId,cityId,countyId],"string");
    }
    return(
      <Modal
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        closable={false}
        okText="确定"
        cancelText="取消"
        width={1000}
        footer={null}
        destroyOnClose={true}
      >
         <HouseForm
          onFetchFormData={handleGetData}
          onCancel={props.handleCancel}
          initData={initData}
         />
      </Modal>
    )
}
EditModal.defaultProps={
  handleOk:()=>{},
  handleCancel:()=>{}
}
export default memo(EditModal)