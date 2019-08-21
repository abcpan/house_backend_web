import React from "react"
import App from "@src/App"
import Register from "@src/pages/account/register"
import {HashRouter,Route,Switch,Redirect} from "react-router-dom"
import SendEmail from '@src/pages/account/send_email/index';
import Login from '@src/pages/account/login/index';
import VerifyEmail from '@src/pages/account/verify_email/index';
import ApplyPasswd from "@src/pages/account/apply_passwd/index"
import ChangePasswd from "@src/pages/account/change_passwd/index"
import ResetPasswd from "@src/pages/account/reset_passwd/index"
import PasswdResult from "@src/pages/account/passwd_result/index"
import LoginLayout from "@src/pages/account/layout/index"
import AdminLayout from "@src/pages/admin/layout"
import Home from "@src/pages/admin/home"
import UserInfo from "@src/pages/admin/user/user_info"
import HouseAdd from "@src/pages/admin/house/house_add"
import HouseList from "@src/pages/admin/house/house_list"
import HouseDetail from "@src/pages/admin/house/house_detail"
import HouseAnalyse from './../pages/admin/house/house_analyse/index';
import HouseResult from "@src/pages/admin/house/house_result"
export default function(){
    return (
    <HashRouter>
      <App>
        <Switch>
          <Route path="/user" render={()=>
              <LoginLayout>
                <Switch>
                  <Route path="/user/register" component={Register}/>
                  <Route path="/user/login" component={Login}/>
                  <Route path="/user/apply_passwd" component={ApplyPasswd}/>
                  <Route path="/user/change_passwd" component={ChangePasswd}/>
                  <Route path="/user/reset_passwd" component={ResetPasswd}/>
                </Switch>
              </LoginLayout>
            }
          >
          </Route>
          <Route path="/verify_email" component={VerifyEmail}/>
          <Route path="/send_email" component={SendEmail}/>
          <Route path="/passwd_result" component={PasswdResult}/>
          <Route path="/admin" render={()=>
              <AdminLayout>
                  <Switch>
                    <Route path="/admin/home" component={Home}/>
                    <Route path="/admin/info" component={UserInfo}/>
                    <Route path="/admin/house/add" component={HouseAdd}/>
                    <Route path="/admin/house/list" component={HouseList}/>
                    <Route path="/admin/house/detail" component={HouseDetail}/>
                    <Route path="/admin/house/analyse" component={HouseAnalyse}/>
                    <Route path="/admin/house/result" component={HouseResult}/>
                    <Redirect to="/admin/home" />
                  </Switch>
              </AdminLayout> 
          }>
          </Route>
          <Redirect to="/user/login" />
        </Switch>
    </App>
    </HashRouter>
        
    )
}