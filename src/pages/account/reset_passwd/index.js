import React,{useEffect,useState} from 'react'
import {
  Form,
  Button,
  Input,
} from "antd"
import styles from "./index.scss"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {resetPasswd} from "@src/redux/user/actions"
import {queryParser} from "@src/utils/formatUtil"
import userBaseSchema  from '@src/schema/userBaseSchema.js';
function RestPasswd(props){
    const [key,setKey] = useState("")
    useEffect(() => {
        const query = queryParser(props.location.search)
        setKey(query.key);
    }, [])
    const handleSubmit=()=>{
      props.form.validateFields({first:true},(error,values)=>{
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
        values.key=key;
        props.resetPasswd(values);
      })
  }
    //重置
    const handleReset=()=>{
          props.form.resetFields();
    }
    const { getFieldDecorator } = props.form;
        return props.isResetPasswd?
              <Redirect to="/passwd_result"/>
              :(
                <div className={styles.form_wrap}>
                  <h2 className={styles.form_title}>密码重置</h2> 
                  <Form labelCol={{span:6}} wrapperCol={{ span:18}}>
                    <Form.Item label="新密码"  colon={false}>
                    {
                      getFieldDecorator("passwd",{
                        rules:[
                          {required: true,message: userBaseSchema.passwd.emptyText},
                          {min: userBaseSchema.passwd.min,max:userBaseSchema.passwd.max,message:userBaseSchema.passwd.sizeText},
                        ],
                        validateTrigger:"onSubmit"
                      })(
                      <Input.Password placeholder={userBaseSchema.passwd.emptyText} />
                      )
                    }
                    </Form.Item>
                  <Form.Item label="确认密码" colon={false}>
                      {
                        getFieldDecorator("confirmPasswd",{
                          rules:[
                            {required: true,message: userBaseSchema.passwd.emptyText},
                            {min: userBaseSchema.confirmPasswd.min,max:userBaseSchema.confirmPasswd.max,message:userBaseSchema.confirmPasswd.sizeText},
                          ],
                          validateTrigger:"onSubmit"
                        })(
                        <Input.Password placeholder={userBaseSchema.confirmPasswd.emptyText} />
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
        isResetPasswd:state.user.isResetPasswd
    }
}
export default connect(mapStateFromProps,{resetPasswd})(Form.create()(RestPasswd));