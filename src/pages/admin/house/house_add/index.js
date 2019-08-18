import React,{
  useState
}
from "react"
import styles from "./index.scss"
import HosueForm from "../components/HouseForm"
import houseService from "@src/service/houseService"
import { ADD_HOUSE_SUCCESS,ADD_HOSUE_FAIL } from './../consts/index';
function HouseAdd(props){
    const handleAddHouse=async (data)=>{
      let isDone = await houseService.handleAddHouse(data);
      if(isDone){
        props.history.push(`/admin/house/result?resultCode=${ADD_HOUSE_SUCCESS}`)
      }else{
        props.history.push(`/admin/house/result?resultCode=${ADD_HOSUE_FAIL}`)
      }
    }
    return (
        <div styles={styles.page_wrap}>
          <HosueForm
            onFetchFormData={handleAddHouse}
          />
        </div>
    )
}

export default HouseAdd