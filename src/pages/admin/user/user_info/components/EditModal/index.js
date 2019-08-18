import {Modal,Form,Input,Radio} from 'antd';
import React from "react"
import styles from "./index.scss"
import {FEMALE,MALE} from "@src/consts"
import userBaseSchema from "@src/schema/userBaseSchema.js"
const {TextArea} =  Input

function EditModal(props){
    const handleOk=()=>{
         props.form.validateFields({first:true},(error,form)=>{
              if(error){
                  return null;
              }
              props.handleOk(form);
         })
    }
    const formItemLayout={
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    }
    const {getFieldDecorator} = props.form;
    return (
        <div className={styles.modal}>
            <Modal
                title="个人信息"
                visible={props.visible}
                onOk={handleOk}
                onCancel={props.handleCancel}
                closable={false}
                okText="确定"
                cancelText="取消"
                width={460}
            >
                <Form layout="vertical"  {...formItemLayout} hideRequiredMark={true}>
                    <Form.Item label="用户名" hideRequiredMark>
                            {
                              getFieldDecorator("name",{
                                initialValue:props.userInfo.name||"",
                                rules:[
                                    {required:true,message:userBaseSchema.name.emptyText},
                                    {min:userBaseSchema.name.min,max:userBaseSchema.name.max,message:userBaseSchema.name.sizeText},
                                    {pattern:userBaseSchema.name.pattern,message:userBaseSchema.name.errorText}
                                ],
                                validateTrigger:"onSubmit"
                              }

                              )(<Input placeholder="用户名" />)
                            }
                    </Form.Item >
                    <Form.Item label="性别" >
                        {
                          getFieldDecorator("gender",{
                              initialValue:props.userInfo.gender!==undefined?props.userInfo.gender:userBaseSchema.gender.defaultValue
                          })(
                            <Radio.Group>
                              <Radio value={MALE}>男</Radio>
                              <Radio value={FEMALE}>女</Radio>
                            </Radio.Group>
                          )
                        }
                       
                    </Form.Item>
                    <Form.Item label="手机号" >
                            {
                              getFieldDecorator("mobile",{
                                 initialValue:props.userInfo.mobile||"",
                                  rules:[
                                      {required:true,message:userBaseSchema.mobile.emptyText},
                                      {pattern:userBaseSchema.mobile.reg,message:userBaseSchema.mobile.errorText}
                                  ],
                                  validateTrigger:"onSubmit"
                              })(
                                <Input placeholder="手机号"  maxLength={11}/>
                              )
                            }
                    </Form.Item >
                    <Form.Item label="个人简介">
                     {
                        getFieldDecorator("aboutMe",{
                          initialValue:props.userInfo.aboutMe||"",
                        })(
                          <TextArea rows={4}/>
                        )
                      }
                         
                    </Form.Item>
                </Form>   
            </Modal>
        </div>
        
    )
  
}
EditModal.defaultProps={
    visible:false,
    handleOk:()=>{},
    handleCancel:()=>{},
    userInfo:{}
}
export default Form.create({})(EditModal)