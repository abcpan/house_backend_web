import { 
  Descriptions,
  Button,
  Row,
  Empty
} from 'antd';
import {connect} from "react-redux"
import React,{useState}from "react"
import { getUserBaseInfoView,getUserAuthInfoView} from '@src/viewConvertion/index';
import EditModal from "./components/EditModal/index"
import EmailModal from "./components/EmailModal"
import AuthModal from "./components/AuthModal"
import {
  updateUserInfo,
  addAuth,
  updateAuthAsync
} from "@src/redux/user/actions"
import styles from './index.scss';
const {Item} = Descriptions
function Person(props){
     const [isShowBaseModal,setIsShowBaseModal] = useState(false)
     const [isShowEmailModal,setIsShowEmailModal] = useState(false)
     const [isShowAuthModal,setIsShowAuthModal] = useState(false)
     const {userInfo,isAuth} = props;
     const renderUserBase=(info)=>{
        let viewList = getUserBaseInfoView(info)
        return viewList.map((_,index)=>{
              return (
                  <Item label={_.label} key={_.label}>
                      {_.label==="邮箱"?
                          <div>
                            <span>{_.value}</span>
                            <span className={styles.btn} onClick={()=>handleClick("email")}>解绑</span>
                          </div>
                        :<span>{_.value}</span>
                      }
                  </Item>
              )
        })
     }
     const renderUserAuth=(info)=>{
        let viewList = getUserAuthInfoView(info);
        return viewList.map(_=>(
            <Item label={_.label} key={_.label}>
              {_.value}
            </Item>
        ))
     }
     const handleClick=(type)=>{
        switch(type){
            case "base":
                return setIsShowBaseModal(pre=>!pre);
            case "auth":
                return setIsShowAuthModal(pre=>!pre)
            case "email":
                return  setIsShowEmailModal(pre=>!pre);
            default:
                return;
        }
     }
     const handleSubmit=(key,values)=>{
          switch(key){
            case "base":
                setIsShowBaseModal(pre=>!pre);
                props.updateUserInfo(values);
                break;
            case "auth":
                setIsShowAuthModal(pre=>!pre)
                values.location = values.location.join(",")
                if(isAuth){
                    props.updateAuthAsync(values);
                }else{
                  props.addAuth(values);
                }
                break;
            case "email":
                setIsShowEmailModal(pre=>!pre);
                break;
            default:
                return;
        }
            
     }
    
    return (
        <div>
            <div className={styles.desc_item}>
                  <Descriptions title="个人信息" size="small" className={styles.description}>
                          {renderUserBase(props.userInfo)}
                  </Descriptions>
                  <Row type="flex" justify="end" style={{marginTop:30}}>
                        <Button type="primary" onClick={()=>handleClick("base")}>修改</Button>
                  </Row>
            </div>
            <div className={styles.desc_item}>
                <Descriptions title="认证信息" size="small" className={styles.description}>
                    {
                      props.userInfo.authInfo ===undefined?
                      <Item>暂无相关数据</Item>
                      :renderUserAuth(props.userInfo.authInfo)
                    }
                </Descriptions>
                <Row type="flex" justify="end" style={{marginTop:30}}>
                        <Button type="primary" onClick={()=>handleClick("auth")}>{isAuth?"修改实名信息":"去实名认证"}</Button>
                </Row>
            </div>
            <EditModal 
                visible={isShowBaseModal}
                handleOk={(value)=>handleSubmit("base",value)}
                handleCancel={()=>{setIsShowBaseModal(preState=>!preState)}}
                userInfo={userInfo}
            />
            
            <EmailModal
               visible={isShowEmailModal}
               handleOk={()=>handleSubmit("email")}
               handleCancel={()=>{setIsShowEmailModal(preState=>!preState)}}
            />
            <AuthModal
              visible={isShowAuthModal}
              handleOk={(values)=>handleSubmit("auth",values)}
              handleCancel={()=>{setIsShowAuthModal(pre=>!pre)}}
              authInfo={userInfo.authInfo?userInfo.authInfo:{}}
            />
        </div>
        
    )
  
}
function mapStateFromProp(state){
  return {
      userInfo:state.user.userInfo,
      isAuth:state.user.isAuth
  }
}
//
export default connect(mapStateFromProp,{updateUserInfo,addAuth,updateAuthAsync})(Person)