import {SET_USR_STATE} from './ActionType';

export const AppReducers = (state,action) => {
    switch (action.type)
    {
        case SET_USR_STATE:
        {
            return Object.assign({},state,{...action.usrState});
        }
        default:
        {
            return state;
        }
    }
};