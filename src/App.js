import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {Redirect,withRouter} from "react-router-dom"
import SessionStorage from './storage/sessionStorage';
import {recoverState} from "@src/redux/action"
function App(props) {
  useEffect(() => {
        let state = SessionStorage.getData("state");
        if(state !==null){
            props.recoverState(state);
        }
  },[])
  useEffect(() => {
      SessionStorage.storeData("state",props.state)
      return ()=>{
        SessionStorage.deleteData("state")
      }
  },[props.state])
  return (
    <div>
         {props.children}
    </div>
  );
}
function mapStateFromProps(state){
    return {
        isLogin:state.user.isLogin,
        state:state
    }
}
export default  connect(mapStateFromProps,{recoverState})(withRouter(App));
