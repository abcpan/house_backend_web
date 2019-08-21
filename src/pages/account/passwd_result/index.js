import React from "react"
import {Result,Button} from "antd"
import userService from "@src/service/userService"
function ResetResult(props){
    const handleRoute=()=>{
      userService.routeToUserLogin();
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
export default ResetResult