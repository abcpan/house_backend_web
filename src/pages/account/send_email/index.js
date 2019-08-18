import {Result,Button} from "antd" 
import React from "react"
import { connect } from 'react-redux';
function SendEmail(props){
       const handleBack=()=>{
             props.history.goBack();
       }
        return (
                <div>
                    <Result
                            status="success"
                            title={props.message}
                            extra={[
                                <Button 
                                type="ghost" 
                                onClick={handleBack} 
                                key="handleBack">返回
                                </Button>
                            ]}
                    />
                </div>
            
        )
}
function mapStateFromProps(state){
        return {
            message:state.user.message,
        }
}
export default connect(mapStateFromProps)(SendEmail)
