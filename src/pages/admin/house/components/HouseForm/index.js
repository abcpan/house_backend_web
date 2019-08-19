import React,{
  useState,
  useEffect
}
from "react"
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  InputNumber,
  Checkbox,
  Upload,
  Icon
} from "antd"
import LocationPicker from '@src/components/LocationPicker';
import houseSchema from "@src/schema/houseSchema"
import {getBase64} from "@src/utils/transformUtil"
import uploadService from "@src/service/uploadService"
const {Option} = Select
function HouseEdit(props){
    const forItemLayout={
      labelCol:{span:9},
      wrapperCol:{span:14}
    }
    const [imagesList,setImageList] = useState([])
    const [floorplansList,setFloorplansList] = useState([])
    const [initData,setInitData] = useState({})
    const [floorplansError,setFloorplansError] =useState({status:"",help:houseSchema.floorplans.sizeText})
    const [imagesError,setImagesError] =useState({status:"",help:houseSchema.images.sizeText})
    const {getFieldDecorator,validateFields,resetFields} = props.form;
    const uploadConfig = {
          listType: 'picture',
    }
    //图片上传函数
    const handleUpload=async (key,{file})=>{
      //判断数量
      if(key==="floorplans" && floorplansList.length>=houseSchema.floorplans.max){
          setFloorplansError({status:"warning",help:houseSchema.floorplans.sizeText})
          return;
      }
      if(key==="images" && imagesList.length>=houseSchema.images.max){
          setImagesError({status:"warning",help:houseSchema.images.sizeText}) 
          return;
      }
      const base64 = await getBase64(file)
      let res = await uploadService.uploadBybase64(base64)
      let {imageURL} = res;
      if(key ==="floorplans"){
            setFloorplansError(pre=>({status:"",help:""}))
            setFloorplansList(pre=>pre.concat({
              uid:imageURL,
              url:imageURL,
              status:"done"
            }))
      }
      if(key==="images"){
          setImagesError(pre=>({status:"",help:""}))
          setImageList(pre=>pre.concat({
            uid:imageURL,
            url:imageURL,
            status:"done"
          }))
      }
    }
    //图片删除函数
    const handleRemove=(key,item)=>{
      if(key ==="floorplans"){
        setFloorplansList(pre=>pre.filter(_=>_.url !==item.url))
      }
      if(key==="images"){
          setImageList(pre=>pre.filter(_=>_.url !==item.url))
      }
    }
    const handleReset=()=>{
        resetFields();
    }
    const handleSubmit =()=>{
        validateFields({first:true},(error,values)=>{
            if(error){
                return;
            }
            //校验图片
            if(imagesList.length ===0){
                setImagesError({status:"error",help:houseSchema.images.emptyText})
                return;
            }
            if(floorplansList.length===0){
                setFloorplansError({status:"error",help:houseSchema.floorplans.emptyText});
                return;
            }
            values.images=imagesList.map(_=>_.url);
            values.floorplans = floorplansList.map(_=>_.url)
            //发送数据
            props.onFetchFormData(values);
        })
    }
    //原始数据
    useEffect(()=>{
      let initData = props.initData? props.initData:{}
      setInitData(initData)
      //设置图片数据
      if(Array.isArray(initData.images)){
            let initImageList =initData.images.map(url=>{
                return {
                  uid:url,
                  url:url,
                  status:"done"
                }
            })
            setImageList(initImageList)
      }
      if(Array.isArray(initData.floorplans)){
            let initFloorplans =initData.floorplans.map(url=>{
              return {
                uid:url,
                url:url,
                status:"done"
              }
            })
            setFloorplansList(initFloorplans)
      }
    },[props.initData])
    
    return (
        <div>
          <Form {...forItemLayout} labelAlign="left">
              <Card type="inner" title="房产基础信息">
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item label={houseSchema.name.label} >
                        {
                            getFieldDecorator("name",{
                              initialValue:initData.name||"",
                              rules:[
                                  {required:true,message:houseSchema.name.emptyText},
                                  {min:houseSchema.name.min,max:houseSchema.name.max,message:houseSchema.name.sizeText},
                              ],
                              validateTrigger:"onSubmit"
                            })(
                              <Input placeholder=""/>
                            )
                        }
                       
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={houseSchema.tradeType.label}>
                        {
                            getFieldDecorator("tradeType",{
                              initialValue:initData.tradeType,
                              rules:[
                                  {required:true,message:houseSchema.tradeType.emptyText},
                              ],
                              validateTrigger:"onSubmit"
                            })(
                              <Select>
                                {
                                  houseSchema.tradeType.options.map(_=>(
                                    <Option value={_.value} key={_.label}>{_.label}</Option>
                                  ))
                                }
                              </Select>
                            )
                        }
                          
                      </Form.Item>
                    </Col>
                    <Col span={8} >
                      <Form.Item label={houseSchema.location.label} >
                        {
                              getFieldDecorator("location",{
                                initialValue:initData.location||[],
                                rules:[
                                    {required:true,message:houseSchema.location.emptyText},
                                ],
                                validateTrigger:"onSubmit"
                              })(
                                <LocationPicker/>
                              )
                          }
                          
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={houseSchema.address.label}>
                        {
                              getFieldDecorator("address",{
                                initialValue:initData.address||"",
                                rules:[
                                    {required:true,message:houseSchema.address.emptyText},
                                    {min:houseSchema.address.min,max:houseSchema.address.max,message:houseSchema.address.sizeText},
                                ],
                                validateTrigger:"onSubmit"
                              })(
                                <Input placeholder=""/>
                              )
                          }
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label= {houseSchema.price.label}>
                          {
                              getFieldDecorator("price",{
                                initialValue:initData.price,
                                rules:[
                                    {required:true,message:houseSchema.price.emptyText},
                                ],
                                validateTrigger:"onSubmit"
                              })(
                                <InputNumber step={1} min={houseSchema.price.min} max={houseSchema.price.max}/>
                              )
                          }
                         
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={houseSchema.area.label} >
                        {
                              getFieldDecorator("area",{
                                initialValue:initData.area,
                                rules:[
                                    {required:true,message:houseSchema.area.emptyText},
                                ],
                                validateTrigger:"onSubmit"
                              })(
                                <InputNumber step={0.1} min={houseSchema.area.min} max={houseSchema.area.max}/>
                              )
                          }
                           
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={houseSchema.beds.label} >
                          {
                              getFieldDecorator("beds",{
                                initialValue:initData.beds,
                                rules:[
                                    {required:true,message:houseSchema.beds.emptyText},
                                ],
                                validateTrigger:"onSubmit"
                              })(
                                <InputNumber step={1} min={houseSchema.beds.min} max={houseSchema.beds.max}/>
                              )
                          }
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={houseSchema.baths.label} >
                          {
                              getFieldDecorator("baths",{
                                initialValue:initData.baths,
                                rules:[
                                    {required:true,message:houseSchema.baths.emptyText},
                                ],
                                validateTrigger:"onSubmit"
                              })(
                                <InputNumber step={1} min={houseSchema.baths.min} max={houseSchema.baths.max}/>
                              )
                          }
                      </Form.Item>
                    </Col>
                  </Row>
              </Card>
            <Card type="inner" title={houseSchema.properties.label}>
                  <Form.Item wrapperCol={{span:24}}>
                      {
                        getFieldDecorator("properties",{
                            initialValue:initData.properties||[],
                            rules:[
                              {required:true,message:houseSchema.properties.emptyText},
                            ],
                            validateTrigger:"onSubmit"
                        })(
                          <Checkbox.Group
                            style={{width:"100%"}}
                            options={houseSchema.properties.options}
                          />
                        )
                      }
                      
                  </Form.Item>
                  <Form.Item label={houseSchema.remarks.label} labelCol={{span:2}} wrapperCol={{span:18}}>
                    {
                        getFieldDecorator("remarks",{
                            initialValue:initData.remarks||"",
                        })(
                          <Input.TextArea rows={4} />
                        )
                      }
                      
                  </Form.Item>
            </Card>
            <Card type="inner" title={houseSchema.images.label}>
                  <Form.Item 
                  wrapperCol={{span:24}}
                  validateStatus={imagesError.status}
                  help={imagesError.help}
                  >
                      <Upload 
                          {...uploadConfig}
                          customRequest={(res)=>handleUpload("images",res)}
                          onRemove={res=>handleRemove("images",res)}
                          fileList={imagesList}
                      >
                          <Button>
                            <Icon type="upload" />{`上传${houseSchema.images.label}`}
                          </Button>
                      </Upload>
                  </Form.Item>
            </Card>
            <Card type="inner" title={houseSchema.floorplans.label}>
                  <Form.Item 
                      wrapperCol={{span:24}}
                      validateStatus={floorplansError.status}
                      help={floorplansError.help}
                  >
                    <Upload 
                          {...uploadConfig}
                          customRequest={(res)=>handleUpload("floorplans",res)}
                          onRemove={res=>handleRemove("floorplans",res)}
                          fileList={floorplansList}
                    >
                        <Button>
                          <Icon type="upload" />{`上传${houseSchema.floorplans.label}`}
                        </Button>
                    </Upload>
                  </Form.Item>
            </Card>
          </Form>
          <Row type="flex" justify="end" style={{marginTop:30}}>
            <Button style={{marginRight:30}} type="primary" onClick={handleSubmit}>保存</Button>
            {
              props.onCancel !==undefined?
              <Button onClick={props.onCancel}>取消</Button>
              : <Button onClick={handleReset}>重置</Button>
            }
           
          </Row>
        </div>
    )
}
HouseEdit.defaultProps={
  onFetchFormData:()=>{}
}
export default Form.create({})(HouseEdit)