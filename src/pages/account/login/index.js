import React from 'react'
import {
  Form,
  Button,
  Input,
} from "antd"
import styles from "./index.scss"
import {connect} from "react-redux"
import {login} from "@src/redux/user/actions"
import  userBaseSchema from '@src/schema/userBaseSchema.js';
import userService from "@src/service/userService"
function Login(props){
    const handleSubmit=()=>{
      props.form.validateFields({first:true},async (error,values)=>{
          if(error){
            return;
          }
        props.login(values);
      })
    }
    const handleRegister=()=>{
          userService.routeToRegister();
    }
    const handleRoute=()=>{
          userService.routeToApplyPasswd();
    }
    const { getFieldDecorator } = props.form;
    return (
          <div className={styles.form_wrap}>
              <h2 className={styles.form_title}>用户登录</h2> 
              <Form labelCol={{span:6}} wrapperCol={{ span:18}}>
              <Form.Item label="用户名" colon={false}>
                {
                  getFieldDecorator("name",{
                    rules:[
                      {required: true,message: userBaseSchema.name.emptyText},
                      {min:userBaseSchema.name.min,max:userBaseSchema.name.max,message: userBaseSchema.name.sizeText},
                      {pattern:userBaseSchema.name.reg,message: userBaseSchema.name.errorText}
                    ],
                    validateTrigger:"onSubmit"
                  }
                  )(
                    <Input placeholder={userBaseSchema.name.emptyText} />
                  )
                }
              </Form.Item>
              <Form.Item label="密码"  colon={false}>
                {
                  getFieldDecorator("passwd",{rules:[
                    {required: true,message:userBaseSchema.passwd.emptyText},
                  ]})(
                    <Input.Password placeholder={userBaseSchema.passwd.emptyText}/>
                  )
                }
              </Form.Item>
              </Form>
              <div className={styles.button_group}>
                    <Button type="primary" onClick={handleSubmit}>登录</Button>
                    <Button onClick={handleRegister}>注册</Button>
              </div>
              <div className={styles.form_tip}>
                  <span onClick={handleRoute}>忘记密码?</span>
              </div>
          </div>
 )
}
export default connect(null,{login})(Form.create()(Login));