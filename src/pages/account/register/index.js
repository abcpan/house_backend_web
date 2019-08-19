import React from 'react'
import {
  Form,
  Button,
  Input
} from "antd"
import styles from "./index.scss"
import formReg from "@src/utils/regexp"
import {register} from "@src/redux/user/actions"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
function Register(props){
    const handleSubmit=()=>{
      props.form.validateFields({first:true},async (error,values)=>{
          if(error){
            return;
          }
          if(values.passwd !==values.confirmPasswd){
              props.form.setFields({
                confirmPasswd:{
                    value:values.confirmPasswd,
                    errors:[new Error(formReg.confirmPasswd.isNotSameText)]
                }
              })
              return;
          }
          //循环结束  表示验证通过
          props.register(values);
        })
    }
        //重置
    const handleReset=()=>{
          props.form.resetFields();
    }
    const handleRoute=()=>{
      props.history.push("/user/login")
    }
    const { getFieldDecorator } = props.form;
    return props.isRegister?
          <Redirect to="/send_email"/>
          :(
            <div className={styles.form_wrap}>
                <h2 className={styles.form_title}>用户注册</h2> 
                <Form labelCol={{span:6}} wrapperCol={{ span:18}}>
                <Form.Item label="用户名" colon={false}>
                  {
                    getFieldDecorator("name",{
                      rules:[
                        {required: true,message:formReg.name.emptyText},
                        {min:formReg.name.min,max:formReg.name.max,message:formReg.name.sizeText},
                        {pattern: formReg.name.reg,message:formReg.name.errorText},
                      ],
                      validateTrigger:"onSubmit"
                      })(
                      <Input placeholder={formReg.name.emptyText}/>
                    )
                  }
                    
                </Form.Item>
                <Form.Item label="手机号" colon={false}>
                  {
                    getFieldDecorator("mobile",{
                      rules:[
                        {required: true,message: formReg.mobile.emptyText},
                        {pattern: formReg.mobile.reg,message: formReg.mobile.errorText},
                      ],
                      validateTrigger:"onSubmit"
                  })(
                      <Input placeholder={formReg.mobile.emptyText} maxLength={11}/>
                    )
                  }
                </Form.Item>
                <Form.Item label="邮箱" colon={false}>
                  {
                    getFieldDecorator("email",{
                      rules:[
                        {required: true,message: formReg.email.emptyText},
                        {pattern: formReg.email.reg,message: formReg.email.errorText},
                      ],
                      validateTrigger:"onSubmit"
                  })(
                      <Input placeholder={formReg.email.emptyText} />
                    )
                  }
                </Form.Item>
                <Form.Item label="密码"  colon={false}>
                  {
                    getFieldDecorator("passwd",{
                      rules:[
                        {required: true,message: formReg.passwd.emptyText},
                        {min:formReg.passwd.min,max:formReg.passwd.max,message: formReg.passwd.sizeText},
                    ],
                    validateTrigger:"onSubmit"
                  })(
                      <Input.Password placeholder={formReg.passwd.emptyText} maxLength={16}/>
                    )
                  }
                </Form.Item>
                <Form.Item label="确认密码" colon={false}>
                  {
                    getFieldDecorator("confirmPasswd",{
                        rules:[
                          {required: true,message:formReg.confirmPasswd.emptyText},
                          {min:formReg.confirmPasswd.min,max:formReg.confirmPasswd.max,message:formReg.confirmPasswd.sizeText}
                        ],
                        validateTrigger:"onSubmit"
                      }
                      )(
                      <Input.Password placeholder={formReg.confirmPasswd.emptyText} />
                    )
                    }
                </Form.Item>
                <div className={styles.button_group}>
                      <Button type="primary" onClick={handleSubmit}>提交</Button>
                      <Button onClick={handleReset}>重置</Button>
                </div>
                <div className={styles.tip}>
                    <span onClick={handleRoute}>已经有账号,去登录</span>
                </div>
                </Form>
            </div>
            
 )
}
function mapStateFromProps(state){
    return {
      isRegister:state.user.isRegister
    }
}
export default connect(mapStateFromProps,{register})(Form.create()(Register));