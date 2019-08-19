import React from "react"
import {
  Modal,
  Descriptions,
  Carousel,
  Divider
}from "antd"
import {getHouseDetailView} from "@src/viewConvertion"
import styles from "./index.scss"
const {Item} = Descriptions;
function HouseDetail(props){
  const {info} = props;
  let viewObj = getHouseDetailView(info);
  let {list,images,floorplans}  = viewObj
  return (
      <Modal
          visible={props.visible}
          onOk={props.handleOk}
          onCancel={props.handleCancel}
          closable={false}
          okText="确定"
          cancelText="取消"
          width={900}
      >
        <div>
          <Descriptions title="房产详细信息" layout="horizontal">
              {
                Array.isArray(list)?
                list.map(_=>(
                  <Item label={_.label} key={_.label}>{_.value}</Item>
                ))
                :<div>暂无相关数据</div>
              }
          </Descriptions>
          <Divider orientation="left">房产实景图</Divider>
          <Carousel autoplay={true}>
              {
                Array.isArray(images)?
                images.map(url=>(
                  <div key={url} className={styles.img_wrap}>
                      <img src={url} alt="实景图"/>
                  </div>
                ))
                :<div>暂时没有相关数据</div>
              }
              
          </Carousel>
          <Divider orientation="left">房产平面图</Divider>
          <Carousel autoplay={true}>
              {
                Array.isArray(floorplans)?
                floorplans.map(url=>(
                  <div key={url} className={styles.img_wrap}>
                      <img src={url} alt="实景图"/>
                  </div>
                ))
                :<div>暂时没有相关数据</div>
              }
              
          </Carousel>
        </div>
        
      </Modal>
      
  )
}
HouseDetail.defaultProps={
  visible:false,
  handleOk:()=>{},
  handleCancel:()=>{}
}
export default HouseDetail