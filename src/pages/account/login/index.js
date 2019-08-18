import React from 'react'
import {
  Form,
  Button,
  Input,
} from "antd"
import styles from "./index.scss"
import formReg from "@src/utils/regexp"
import {connect} from "react-redux"
import {login,resetLoginStatus} from "@src/redux/user/actions"
import {Redirect} from "react-router-dom"
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
          props.history.push("/user/register")
    }
    const handleRoute=()=>{
          props.history.push("/user/apply_passwd")
    }
    const { getFieldDecorator } = props.form;
    return props.isLogin?
          <Redirect to="/admin/home"/>
        :
        (
          <div className={styles.form_wrap}>
              <h2 className={styles.form_title}>用户登录</h2> 
              <Form labelCol={{span:6}} wrapperCol={{ span:18}}>
              <Form.Item label="用户名" colon={false}>
                {
                  getFieldDecorator("name",{
                    rules:[
                      {required: true,message: formReg.name.emptyText},
                      {min:formReg.name.min,max:formReg.name.max,message: formReg.name.sizeText},
                      {pattern:formReg.name.reg,message: formReg.name.errorText}
                    ],
                    validateTrigger:"onSubmit"
                  }
                  )(
                    <Input placeholder={formReg.name.emptyText} />
                  )
                }
              </Form.Item>
              <Form.Item label="密码"  colon={false}>
                {
                  getFieldDecorator("passwd",{rules:[
                    {required: true,message:formReg.passwd.emptyText},
                  ]})(
                    <Input.Password placeholder={formReg.passwd.emptyText}/>
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
function mapStateFromProps(state){
    return {
        isLogin:state.user.isLogin
    }
}
export default connect(mapStateFromProps,{login})(Form.create()(Login));