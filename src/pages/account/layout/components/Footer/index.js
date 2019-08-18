import React from "react"
import styles from "./index.scss"
export default function Footer(){
    return (
      <footer className={styles.footer}>
          <div className={styles.footer_title}>个人作品,房产管理平台</div>
          <div className={styles.footer_desc}>邮箱1663071425@qq.com</div>
      </footer>
    )
}