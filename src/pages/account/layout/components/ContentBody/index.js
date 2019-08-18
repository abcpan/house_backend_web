import React from "react"
import styles  from "./index.scss"
import {Row,Col} from "antd"
export default function ContentBody(props){
    return (
        <div className={styles.content_body}>
            <Row className={styles.body_row} type="flex">
                  <Col span={17} >
                        <p className={styles.body_text}>
                              高效简洁的后台管理平台
                        </p>
                  </Col>
                  <Col span={7} className={styles.body_col}>
                      {props.children}
                  </Col>
              </Row>
        </div>
    )
}