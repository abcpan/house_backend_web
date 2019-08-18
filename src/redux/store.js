import {createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';
import {user} from "./user/reducer"
import {house} from "./house/reducer"
const reducers = combineReducers({
    user,
    house
})
export default createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(thunk),
    )
)

