import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import "./index.css"
import Router from "@src/router"
import {Provider} from "react-redux"
import store from "@src/redux/store"
ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>
, 
document.getElementById('root'));

