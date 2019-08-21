import React from 'react'
import {
  Form,
  Button,
  Input,
} from "antd"
import styles from "./index.scss"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {applyResetPasswd} from "@src/redux/user/actions"
import userBaseSchema  from '@src/schema/userBaseSchema.js';
function ApplyPasswd(props){
        const handleSubmit=()=>{
            props.form.validateFields({first:true},(error,values)=>{
                if(error){
                  return;
                }
              props.applyResetPasswd(values);
            })
        }
        //重置
        const handleReset=()=>{
             props.form.resetFields();
        }
        const { getFieldDecorator } = props.form;
        return (
                  <div className={styles.form_wrap}>
                      <h2 className={styles.form_title}>找回密码</h2> 
                      <Form labelCol={{span:6}} wrapperCol={{ span:18}}>
                      <Form.Item label="邮箱" colon={false}>
                        {
                          getFieldDecorator("email",{
                            rules:[
                              {required: true,message: userBaseSchema.email.emptyText},
                              {pattern:userBaseSchema.email.reg,message: userBaseSchema.email.errorText},
                            ],
                            validateTrigger:"onSubmit"
                        })(
                            <Input placeholder={userBaseSchema.email.emptyText} />
                          )
                        }
                      </Form.Item>
                      <Form.Item wrapperCol={{span:24}} >
                          <div className={styles.button_group}>
                            <Button type="primary" onClick={handleSubmit}>提交</Button>
                            <Button onClick={handleReset}>重置</Button>
                          </div>
                      </Form.Item>
                      </Form>
                  </div>
                    
        )
}
function mapStateFromProps(state){
    return {
        isApplyResetPasswd:state.user.isApplyResetPasswd
    }
}
export default connect(mapStateFromProps,{applyResetPasswd})(Form.create()(ApplyPasswd));