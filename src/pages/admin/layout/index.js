import React from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import LeftNav from "./components/LeftNav"
import SideHeader from "./components/Header"
import {Layout} from "antd"
import styles from "./index.scss";
const { Header, Content,Sider } = Layout;
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
                  {props.children}
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