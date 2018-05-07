import {SET_USR_STATE} from './ActionType';

function getUsrStateDefaultParams() {
    return ({
        userAuth:false,
        userCookies:'',
        userState:{
        }
    });
}
export function changeUsrState(usrState = getUsrStateDefaultParams())
{
    return {type:SET_USR_STATE,usrState:usrState};
}