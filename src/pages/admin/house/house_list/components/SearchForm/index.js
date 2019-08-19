import React,{
  useRef
}from "react"
import {
  Card,
  Row,
  Col,
  Input,
  Form,
  Select
}from "antd"
import houseSchema  from '@src/schema/houseSchema';
import LocationPicker from '@src/components/LocationPicker';
const {Option} = Select
function SearchForm(props){
    const formItemmLayout={
        labelCol:{
            span:6
        },
        wrapperCol:{
          span:12
        }
    }
    const ctx = useRef(null);
    const handleChange=(key,value)=>{
      if(ctx.current){
        clearTimeout(ctx.current);
      }
      ctx.current = setTimeout(()=>{
          props.onChange({[key]:value})
      },500)
    }
    return (
        <div style={{marginBottom:30}}>
           <Card title="条件搜索">
             <Form {...formItemmLayout}>
                <Row>
                  <Col span={6}>
                    <Form.Item label="房产名称">
                        <Input onChange={({target})=>handleChange("name",target.value)}/>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="价格排序">
                        <Select  onChange={(value)=>handleChange("sort",value)}>
                          {
                              houseSchema.priceSort.options.map(_=>(
                                <Option value={_.value} key={_.label}>{_.label}</Option>
                              ))
                            }
                        </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="交易类型">
                        <Select onChange={(value)=>handleChange("tradeType",value)}>
                            {
                              houseSchema.tradeType.options.map(_=>(
                                <Option value={_.value} key={_.label}>{_.label}</Option>
                              ))
                            }
                           <Option value={null} >{"全部"}</Option>
                        </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="售卖状态">
                        <Select style={{ width: 120 }} onChange={(value)=>handleChange("state",value)}>
                            {
                              houseSchema.state.options.map(_=>(
                                <Option value={_.value} key={_.label}>{_.label}</Option>
                              ))
                            }
                            <Option value={null} >{"全部"}</Option>
                        </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label={houseSchema.location.label}>
                        <LocationPicker
                          onChange={(value)=>handleChange("location",value)}
                        />
                    </Form.Item>
                  </Col>
                </Row>
             </Form>
              
           </Card>
        </div>
    )
}
SearchForm.defaultProps={
  onChange:()=>{}
}
export default SearchForm