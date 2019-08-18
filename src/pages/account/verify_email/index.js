import {Result,Button} from "antd" 
import React,{useEffect} from "react"
import { connect } from 'react-redux';
import {queryParser} from "@src/utils/formatUtil"
import {verifyEmail} from "@src/redux/user/actions"
function VerifyEmail(props){
       
       const handleVerify=()=>{
             if(props.isVerifyEmail){
                  props.history.push("/login");
             }else{
                props.history.push("/register");
             }
       }
       const search = props.location.search;
       useEffect(()=>{
           const query = queryParser(search)
           props.verifyEmail({key:query.key})
       },[])
        return (
                <div>
                    <Result
                            status={props.isVerifyEmail?"success":"error"}
                            title={props.message}
                            extra={[
                                <Button 
                                  type="primary" 
                                  onClick={handleVerify} 
                                  key="primary">
                                    {props.isVerifyEmail?"去登录":"重新注册"}
                                </Button>,
                            ]}
                    />
                </div>
            
        )
}
VerifyEmail.defaultProps={
    isVerifyEmail:true
}
function mapStateFromProps(state){
        return {
            message:state.user.message,
            isVerifyEmail:state.user.isVerifyEmail
        }
}
export default connect(mapStateFromProps,{verifyEmail})(VerifyEmail)
