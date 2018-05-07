import {createStore} from 'redux';
import  {AppReducers} from './Reducer'

export const reduxStore = createStore(AppReducers,
    {
        userAuth:false,
        userCookies:'',
        userState:{
        }
    });