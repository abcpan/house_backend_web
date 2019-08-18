import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ContentBody from './components/ContentBody/index';
function  LoginLayout (props){
    return (
        <div>
            <Header/>
              <ContentBody>
                  {props.children}
              </ContentBody>
            <Footer/>
        </div>
    )
}

export default LoginLayout