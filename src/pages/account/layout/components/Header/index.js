import React,{memo} from 'react';
import styles from './index.scss';
import {Row,Col} from "antd"
import logoURL from "./images/logo.jpg"
const linkList=[
    {name:"百度搜索",link:"http://www.baidu.com"},
    {name:"京东商城",link:"http://www.taobao.com"},
    {name:"淘宝购物",link:"http://www.jngdong.com"},
]
function Header(props){
  return (
    <div className={styles.header}>
        <Row type="flex" align="middle" justify="space-around" style={{height:100}}>
                <Col span={8}>
                    <div className={styles.logo_wrap}>
                        <img src={logoURL} alt="logo" className={styles.logo}/>
                    </div>
                
                </Col>
                <Col span={10}>
                    <div className={styles.nav_wrap}>
                                {
                                    linkList.map(item=>(
                                        <a href={item.link} className={styles.nav_item} key={item.link}>{item.name}</a>
                                    ))
                                }
                    </div>
                
                
                </Col>
        </Row>
    </div>
  );
}
export default memo(Header);