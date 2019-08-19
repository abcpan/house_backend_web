import React from "react"
import {Menu,Icon} from "antd"
import {menuList} from "./menuList.js"
import {NavLink} from "react-router-dom"
import styles from "./index.scss"
const {SubMenu} = Menu 

export default function LeftNav(props){
    const renderMenu=(menuList)=>{
          return menuList.map(item=>{
              if(item.children){
                    return (
                      <SubMenu title={item.title} key={item.key}>
                          {renderMenu(item.children)}
                      </SubMenu>
                    )
                    
              }
              return (
                <Menu.Item key={item.key}>
                  <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>)
          })
    }
    return (
      <div>
          <div className={styles.logo_wrap}>
              <img src={require("./logo-ant.svg")} alt="logo"/>
              <h1>个人作品</h1>
          </div>
          <Menu
            theme={"this.state.theme"}
            style={{ width:"100%"}}
            defaultSelectedKeys={["/admin/home"]}
            mode="inline"
            theme="dark"
          >
            {
              renderMenu(menuList)
            }
          </Menu>
    </div>
    )
}