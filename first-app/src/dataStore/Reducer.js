import {SET_USR_STATE} from './ActionType';

export const AppReducers = (state,action) => {
    switch (action.type)
    {
        case SET_USR_STATE:
        {
            let obj = Object.assign({},state,{...action.usrState});
            return obj;
        }
        default:
        {
            return state;
        }
    }
};