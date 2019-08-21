import React from 'react'
import {
  Form,
  Button,
  Input
} from "antd"
import styles from "./index.scss"
import {register} from "@src/redux/user/actions"
import {connect} from "react-redux"
import userBaseSchema  from '@src/schema/userBaseSchema.js';
import userService  from '@src/service/userService';
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
                    errors:[new Error(userBaseSchema.confirmPasswd.isNotSameText)]
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
        userService.routeToUserLogin();
    }
    const { getFieldDecorator } = props.form;
    return (
            <div className={styles.form_wrap}>
                <h2 className={styles.form_title}>用户注册</h2> 
                <Form labelCol={{span:6}} wrapperCol={{ span:18}}>
                <Form.Item label="用户名" colon={false}>
                  {
                    getFieldDecorator("name",{
                      rules:[
                        {required: true,message:userBaseSchema.name.emptyText},
                        {min:userBaseSchema.name.min,max:userBaseSchema.name.max,message:userBaseSchema.name.sizeText},
                        {pattern: userBaseSchema.name.reg,message:userBaseSchema.name.errorText},
                      ],
                      validateTrigger:"onSubmit"
                      })(
                      <Input placeholder={userBaseSchema.name.emptyText}/>
                    )
                  }
                    
                </Form.Item>
                <Form.Item label="手机号" colon={false}>
                  {
                    getFieldDecorator("mobile",{
                      rules:[
                        {required: true,message: userBaseSchema.mobile.emptyText},
                        {pattern: userBaseSchema.mobile.reg,message: userBaseSchema.mobile.errorText},
                      ],
                      validateTrigger:"onSubmit"
                  })(
                      <Input placeholder={userBaseSchema.mobile.emptyText} maxLength={11}/>
                    )
                  }
                </Form.Item>
                <Form.Item label="邮箱" colon={false}>
                  {
                    getFieldDecorator("email",{
                      rules:[
                        {required: true,message: userBaseSchema.email.emptyText},
                        {pattern: userBaseSchema.email.reg,message: userBaseSchema.email.errorText},
                      ],
                      validateTrigger:"onSubmit"
                  })(
                      <Input placeholder={userBaseSchema.email.emptyText} />
                    )
                  }
                </Form.Item>
                <Form.Item label="密码"  colon={false}>
                  {
                    getFieldDecorator("passwd",{
                      rules:[
                        {required: true,message: userBaseSchema.passwd.emptyText},
                        {min:userBaseSchema.passwd.min,max:userBaseSchema.passwd.max,message: userBaseSchema.passwd.sizeText},
                    ],
                    validateTrigger:"onSubmit"
                  })(
                      <Input.Password placeholder={userBaseSchema.passwd.emptyText} maxLength={16}/>
                    )
                  }
                </Form.Item>
                <Form.Item label="确认密码" colon={false}>
                  {
                    getFieldDecorator("confirmPasswd",{
                        rules:[
                          {required: true,message:userBaseSchema.confirmPasswd.emptyText},
                          {min:userBaseSchema.confirmPasswd.min,max:userBaseSchema.confirmPasswd.max,message:userBaseSchema.confirmPasswd.sizeText}
                        ],
                        validateTrigger:"onSubmit"
                      }
                      )(
                      <Input.Password placeholder={userBaseSchema.confirmPasswd.emptyText} />
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

export default connect(null,{register})(Form.create()(Register));