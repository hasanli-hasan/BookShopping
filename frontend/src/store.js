import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
     productListReducer,
     productDetailsReducer,
     productDeleteReducer,
     productCreateReducer,
     productUpdateReducer,
    
    } from './reducers/productReducers.js';

import {cartReducer} from './reducers/cartReducer';

import{userLoginReducer,
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateFAReducer
} from './reducers/userReducers'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateFAReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :null

const initialState = {
    cart : {cartItems: cartItemsFromStorage},
    userLogin:{userInfo:userInfoFromStorage},
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;