import {Modal} from 'antd';
import React from "react"
import styles from "./index.scss"
function EmailModal(props){
    const handleOk=()=>{
          props.handleOk();
    }
    return (
        <div className={styles.modal}>
            <Modal
                title="个人信息"
                visible={props.visible}
                onOk={handleOk}
                onCancel={props.handleCancel}
                closable={false}
                okText="确定"
                cancelText="取消"
                width={460}
            >
             目前邮件不支持解绑哦
            </Modal>
        </div>
    )
  
}
EmailModal.defaultProps={
    visible:false,
    handleOk:()=>{},
    handleCancel:()=>{},
    userInfo:{}
}
export default EmailModal