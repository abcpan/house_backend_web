import React from "react"
import {
  Cascader 
} from "antd"
import { location_config } from './../../config/location';
export default class LocationPicker extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
      return (
        <Cascader
            {...this.props}
            options={location_config}
            allowClear={true}
            notFoundContent="暂无相关数据"
        />
      )
    }
    
}
LocationPicker.defaultProps={
  placeholder:"请选择地区",
}
