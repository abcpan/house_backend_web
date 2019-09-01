import React from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import LeftNav from "./components/LeftNav"
import SideHeader from "./components/Header"
import {Layout} from "antd"
import styles from "./index.scss";
import userService from '@src/service/userService';
const { Header, Content,Sider } = Layout;
const isLogin = userService.isLogin
function AdminLayout (props){
    return (
          <Layout className={styles.layout}>
            <Sider  className={styles.side_layout}>
                <LeftNav/>
            </Sider>
            <Layout>
              <Header className={styles.header_layout}>
                <SideHeader/>
              </Header>
              <Content className={styles.content_layout}>
                  {
                    isLogin?props.children:<Redirect to="/user/login"/>
                  }
              </Content>
            </Layout>
          </Layout>
          
    )
}
function mapStateFromState(state){
        return {
            isLogin:state.user.isLogin
        }
}
export default  connect(mapStateFromState)(AdminLayout)