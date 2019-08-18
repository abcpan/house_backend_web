import React,{useEffect} from 'react'
import {
  Form,
  Button,
  Input,
} from "antd"
import styles from "./index.scss"
import formReg from "@src/utils/regexp"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {changePasswd} from "@src/redux/user/actions"
function ChangePasswd(props){
    const handleSubmit=()=>{
      props.form.validateFields({first:true},(error,values)=>{
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
        props.changePasswd(values);
      })
  }
        //重置
        const handleReset=()=>{
             props.form.resetFields();
        }
        const { getFieldDecorator } = props.form;
        return props.isChangePasswd?
              <Redirect to="/passwd_result"/>
              :(
                <div className={styles.form_wrap}>
                  <h2 className={styles.form_title}>密码重置</h2> 
                  <Form labelCol={{span:6}} wrapperCol={{ span:18}}>
                    <Form.Item label="当前密码"  colon={false}>
                    {
                      getFieldDecorator("currentPasswd",{
                        rules:[
                          {required: true,message: formReg.passwd.emptyText},
                          {min: formReg.passwd.min,max:formReg.passwd.max,message:formReg.passwd.sizeText},
                        ],
                        validateTrigger:"onSubmit"
                      })(
                      <Input.Password placeholder={formReg.passwd.emptyText} />
                      )
                    }
                    </Form.Item>
                    <Form.Item label="新密码"  colon={false}>
                    {
                      getFieldDecorator("passwd",{
                        rules:[
                          {required: true,message: formReg.passwd.emptyText},
                          {min: formReg.passwd.min,max:formReg.passwd.max,message:formReg.passwd.sizeText},
                        ],
                        validateTrigger:"onSubmit"
                      })(
                      <Input.Password placeholder={formReg.passwd.emptyText} />
                      )
                    }
                    </Form.Item>
                  <Form.Item label="确认密码" colon={false}>
                      {
                        getFieldDecorator("confirmPasswd",{
                          rules:[
                            {required: true,message: formReg.passwd.emptyText},
                            {min: formReg.confirmPasswd.min,max:formReg.confirmPasswd.max,message:formReg.confirmPasswd.sizeText},
                          ],
                          validateTrigger:"onSubmit"
                        })(
                        <Input.Password placeholder={formReg.confirmPasswd.emptyText} />
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
      isChangePasswd:state.user.isChangePasswd
    }
}
export default connect(mapStateFromProps,{changePasswd})(Form.create()(ChangePasswd));