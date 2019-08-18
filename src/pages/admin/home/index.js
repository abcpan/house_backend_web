import React from "react"
import {connect} from "react-redux"
import styles from "./index.scss"
import backgroundURL from "./images/background.jpg"
function Home (props){
    return (
          <div className={styles.home_container}>
                <div className={styles.home_logo}>
                  <img src={backgroundURL} alt="" />
                  <h1>欢迎来到个人作品管理平台</h1>
                </div>
              
          </div>
    )
}
function mapStateFromProps(state){
    return {
        isLogin:state.user.isLogin
    }
}
export default connect(mapStateFromProps)(Home)