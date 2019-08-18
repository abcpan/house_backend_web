import React,{useEffect,useState} from "react"
import styles from "./index.scss"
import {
  Row,
  message,
  Avatar,
  Dropdown,
  Icon,
  Menu,
  Modal
} from "antd"
import {connect} from "react-redux"
import {
  getUserInfo,
  resetLoginStatus,
  updateAvatar
} from "@src/redux/user/actions"
import { withRouter } from 'react-router-dom';
import ImgUpload from "@src/components/ImgUpload"
const USER_INFO_URL = "/admin/user_info"
const CHANGE_PASSWD_URL = "/user/change_passwd"
const TIPDURATION = 1.8
function Header(props){
    const [visible,setVisible] =useState(false)
    const [imageURL,setImgURL] = useState("")
    const handleLogout=()=>{
        props.resetLoginStatus();
    }
    const handleRoute=(url)=>{
        props.history.push(url)
    }
    useEffect(() => {
        props.getUserInfo();
    },[])
    //控制模态框状态
    const handleChangeAvatar=()=>{
      if(!props.isAuth){
          return message.info("未认证用户不能更改头像哦",TIPDURATION);
      }
      setVisible(pre=>!pre);
    }
    const handleUpload=(url)=>{
        setImgURL(url)
    }
    const handleOk=()=>{
        if(imageURL===""){
            message.info("您尚未上传头像",TIPDURATION)
            return;
        }
        props.updateAvatar({imageURL})
        setVisible(pre=>!pre);
    }
    const handleCancel=()=>{
      setVisible(pre=>!pre);
    }
    const menu = (
        <Menu>
            <Menu.Item onClick={()=>handleRoute(USER_INFO_URL)}>我的资料</Menu.Item>
            <Menu.Item onClick={()=>handleRoute(CHANGE_PASSWD_URL)}>重置密码</Menu.Item>
            <Menu.Item onClick={handleChangeAvatar}>修改头像</Menu.Item>
            <Menu.Item onClick={handleLogout}>注销</Menu.Item>
            
        </Menu>
    )
    const {name,authInfo} = props.user;
    return (
        <div className={styles.header}>
           <div className={styles.header_info}>
             <Avatar
                src={authInfo && authInfo.avatar? authInfo.avatar:""}
                size={50}
             />
             <Dropdown overlay={menu} overlayClassName={styles.dropdown}>
                <div className={styles.info_meta}>
                    <span>用户名:</span>
                    <span>{name?name:"匿名用户"}</span>
                    <Icon type="down" />
                </div> 
            </Dropdown>
             
          </div>
          <Modal
            title="更换头像"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            okText="确定"
            cancelText="取消"
            width={400}
          >
            <ImgUpload
              onUpload={handleUpload}
            />
          </Modal>
        </div>
    )
}
function mapStateFromProps(state){
    return {
      user:state.user.userInfo,
      isAuth:state.user.isAuth
    }
   
}
export default connect(mapStateFromProps,{getUserInfo,resetLoginStatus,updateAvatar})(withRouter(Header));
