import * as ActionType from './ActionType';

export const clientLogin = (usrname,usrpasswd) => {
    return (
        {
            type:ActionType.ClientLoginClicked,
            userName:usrname,
            userPassWD:usrpasswd
        }
    );
};