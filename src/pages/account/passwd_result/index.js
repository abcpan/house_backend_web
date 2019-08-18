import React,{useEffect} from "react"
import {Result,Button} from "antd"
import {connect} from "react-redux"
function ResetResult(props){
    const handleRoute=()=>{
        props.history.push("/user/login")
    }
    return (
      <div>
        <Result
          status={"success"}
          title={"密码修改成功"}
          extra={[
              <Button 
                type="primary" 
                onClick={handleRoute} 
                key="primary">
                  {"去登录"}
              </Button>
          ]}
        />
      </div>
      
    )
}
export default connect(null)(ResetResult)