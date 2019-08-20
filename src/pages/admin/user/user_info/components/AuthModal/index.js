import {Modal,
  Form,
  Input,
  Radio,
  Cascader
} from 'antd';
import React,{
  useState,
  useEffect
} from "react"
import styles from "./index.scss"
import { NORMAL_CUSTOMER,HOSUE_AGENT } from '../../../../../../consts/index';
import ImgUpload from "@src/components/ImgUpload"
import userAuthSchema from "@src/schema/userAuthSchema"
import {transTypeFromList} from "@src/utils/formatUtil"
function AuthModal(props){
    const [isShowAgency,setIsShowAgency] = useState(false)
    const [locationConfig,setLocationConfig] = useState([])
    useEffect(()=>{
        const getLocationConfig=async()=>{
          const config = await import("@src/config/location")
          const {location_config} = config;
          setLocationConfig(location_config)
        }
        getLocationConfig()
    },[])
    const handleOk=()=>{
          props.form.validateFields({first:true},(error,value)=>{
                if(error){
                    return;
                }
                props.handleOk(value)
          })
    }
    const handleRadio=(event)=>{
      const {value} = event.target;
      if(value ===NORMAL_CUSTOMER){
          setIsShowAgency(false);
      }else{
          setIsShowAgency(true);
      }
    }
    useEffect(() => {
        if(props.authInfo && props.authInfo.userType === HOSUE_AGENT){
          setIsShowAgency(true);
        }
    }, [])
    const handleUpload=async (imgURL)=>{
          props.form.setFieldsValue({
            avatar:imgURL
          })
    }
 
    const formItemLayout={
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span:18
      }
    }
    const {getFieldDecorator} =props.form;
    const {authInfo} = props;
    const {provinceId,cityId,countyId} = authInfo && authInfo.location?authInfo.location:{}
    const initLocation = transTypeFromList([provinceId,cityId,countyId],"string")
    return (
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
              <Form {...formItemLayout}>
                <Form.Item label={userAuthSchema.realName.label}>
                    {
                        getFieldDecorator("realName",{
                          initialValue:authInfo.realName||"",
                          rules:[
                              {required:true,message:userAuthSchema.realName.emptyText},
                              {pattern:userAuthSchema.realName.pattern,message:userAuthSchema.realName.errorText}
                          ],
                          validateTrigger:"onSubmit"
                        }

                        )(<Input placeholder="用户名" />)
                    }
                </Form.Item >
                <Form.Item label={userAuthSchema.idCard.label}>
                  {
                          getFieldDecorator("idCard",{
                            initialValue:authInfo.idCard||"",
                            rules:[
                                {required:true,message:userAuthSchema.idCard.emptyText},
                                {min:userAuthSchema.idCard.min,max:userAuthSchema.idCard.max,message:userAuthSchema.idCard.sizeText},
                                {pattern:userAuthSchema.idCard.pattern,message:userAuthSchema.idCard.errorText}
                            ],
                            validateTrigger:"onSubmit"
                          }

                          )(<Input placeholder="身份证号码" maxLength={18} />)
                   }
                </Form.Item >
                <Form.Item label={userAuthSchema.userType.label}>
                   {
                     getFieldDecorator("userType",{
                        initialValue:authInfo.userType!==undefined?authInfo.userType:userAuthSchema.userType.defaultValue,
                        validateTrigger:"onSubmit"
                     })(
                      <Radio.Group onChange={handleRadio}>
                          <Radio value={NORMAL_CUSTOMER}>普通用户</Radio>
                          <Radio value={HOSUE_AGENT}>房产经纪人</Radio>
                      </Radio.Group>
                     )
                   }
                </Form.Item>
                {
                    isShowAgency?
                    <Form.Item label={userAuthSchema.agencyName.label}>
                    {
                          getFieldDecorator("agencyName",{
                            initialValue:authInfo.agencyName||"",
                            rules:[
                                {required:true,message:userAuthSchema.agencyName.emptyText},
                            ],
                            validateTrigger:"onSubmit"
                          }

                          )(<Input placeholder="机构名称" />)
                      }
                   </Form.Item>
                   :null
                }
                
                <Form.Item label={userAuthSchema.location.label}>
                    {
                        getFieldDecorator("location",{
                          initialValue:initLocation,
                          rules:[
                              {required:true,message:userAuthSchema.location.emptyText},
                          ],
                          validateTrigger:"onSubmit"
                        }

                        )(<Cascader options={locationConfig} allowClear={true} placeholder={userAuthSchema.location.emptyText}/>)
                      }
                </Form.Item>
                <Form.Item label="头像上传">
                    {
                        getFieldDecorator("avatar",{
                          initialValue:authInfo.avatar,
                          rules:[
                              {required:true,message:userAuthSchema.avatar.emptyText}
                          ]
                        })(
                          <ImgUpload
                            onUpload={handleUpload}
                            imgURL = {authInfo.avatar}
                          />
                        )
                    }
                </Form.Item>
              </Form>
            </Modal>
            
    )
  
}
AuthModal.defaultProps={
    visible:false,
    handleOk:()=>{},
    handleCancel:()=>{},
    userInfo:{}
}
export default Form.create({})(AuthModal)