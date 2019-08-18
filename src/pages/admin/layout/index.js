import React from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import LeftNav from "./components/LeftNav"
import Header from "./components/Header"
import {Row,Col} from "antd"
import styles from "./index.scss";
function AdminLayout (props){
    return (
          <Row>
              <Col span={4} className={styles.nav_left}>
                <LeftNav/>
              </Col>
              <Col span={20} className={styles.main}>
                  <Header/>
                  <Row>
                      <div className={styles.content}>
                            {
                                props.isLogin?props.children:<Redirect to="/user/login"/>
                            }
                      </div>
                      
                  </Row>
              </Col>
          </Row>
    )
}
function mapStateFromState(state){
        return {
            isLogin:state.user.isLogin
        }
}
export default  connect(mapStateFromState)(AdminLayout)