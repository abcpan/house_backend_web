import React,{
  useEffect
 } from "react";
import {
  Cascader 
} from "antd"

export default class LocationPicker extends React.Component{
    constructor(props){
        super(props);
        this.state={
          locConfig:[]
        }
    }
    async componentDidMount(){
      const config = await import('./../../config/location')
      let {location_config} = config
      this.setState({
        locConfig:location_config
      })
    }
    render(){
      return (
        <Cascader
            {...this.props}
            options={this.state.locConfig}
            allowClear={true}
            notFoundContent="暂无相关数据"
        />
      )
    }
    
}
LocationPicker.defaultProps={
  placeholder:"请选择地区",
}
