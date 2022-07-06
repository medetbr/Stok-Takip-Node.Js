import {applyMiddleware, combineReducers, compose,legacy_createStore as createStore} from "redux"
import {login} from "./reducers/user"
import thunk from "redux-thunk"
import { supplier } from "./reducers/supplier"


const initialState = {
    userLogin:{
        loggedIn: localStorage.getItem("accessToken")?true:false,
        user:localStorage.getItem("userInfo")?
        JSON.parse(localStorage.getItem("userInfo")):null,
    }
}
const reducer = combineReducers({
    userLogin: login,
    suppliers: supplier,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export default store;