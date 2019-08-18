import React,{useEffect,useState} from "react"
import { queryParser } from '@src/utils/formatUtil';
import { 
  ADD_HOUSE_SUCCESS,
  ADD_HOSUE_FAIL,
  UPDATE_HOSUE_FAIL,
  UPDATE_HOSUE_SUCCESS
} from './../consts/index';
import {
  Result,
  Button
} from "antd"
function HosueResult(props){
    const [result,setResult] = useState({status:"info",text:"请稍后"})
    useEffect(()=>{
        const query = queryParser(props.location.search);
        let {resultCode} = query;
        mapResult(Number(resultCode))
    },[])
    const mapResult=(resultCode)=>{
        switch(resultCode){
            case ADD_HOUSE_SUCCESS:
                return setResult({status:"success",text:"房产添加成功"})
            case ADD_HOSUE_FAIL:
                return setResult({status:"error",text:"房产添加失败"})
            case UPDATE_HOSUE_SUCCESS:
                return setResult({status:"success",text:"房产更新成功"})
            case UPDATE_HOSUE_FAIL:
                return setResult({status:"error",text:"房产更新失败"})
            default:
              return;
        }
    }
    const handleRoute=()=>{
      props.history.goBack();
    }
    return (
        <div>
            <Result
              status={result.status}
              title={result.text}
              extra={
                  <Button type="primary" onClick={handleRoute}>返回</Button>
              }
            />
        </div>
    )
}

export default HosueResult