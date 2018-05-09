import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import logo from '../Logo.png'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import * as Action from '../dataStore/Action'
import {reduxStore} from '../dataStore/ReduxStore'

import sha256 from 'crypto-js/sha256';

const loginStyle = {
    'textAlign': 'center',
    'width': '50%',
    'left': '0px',
    'right': '0px',
    'margin': 'auto'
};

class LoginDialog extends Component {
    constructor(props) {
        super(props);
        this.loginButtonOnClick = this.loginButtonOnClick.bind(this);
        this.usrNameOnChange = this.usrNameOnChange.bind(this);
        this.usrPassWDOnChange = this.usrPassWDOnChange.bind(this);
        this.registerButtonClick = this.registerButtonClick.bind(this);
        this.state = {args: 0, warningTags: '',loginState:false,userID:null};
    }

    usrNameOnChange(usrName) {
        if (usrName.target.value) {
            this.setState({
                usrName: usrName.target.value,
            });
        }
    }

    usrPassWDOnChange(usrPassWD) {
        if (usrPassWD.target.value) {
            let val = usrPassWD.target.value;
            this.setState({
                userPassWD: sha256(val).toString(),
            });
        }
    }

    loginButtonOnClick() {
        if (this.state.usrName && this.state.userPassWD) {
            if (this.state.userPassWD.length >= 6) {
                const timeStamp = new Date().getTime();//Get Timestamp
                try {
                    axios.post('/Auth/Auth',
                        {
                            userName: this.state.usrName,
                            userPassWD: this.state.userPassWD,
                            currentTime: timeStamp
                        },
                    )
                        .then((response) => {
                            try{
                                const jsonResponse = JSON.parse(JSON.stringify(response.data));
                                if(jsonResponse['authState'] === 0)
                                {
                                    reduxStore.dispatch(Action.changeUsrState({userAuth:true,userCookies:jsonResponse['userID'],usrState:{}}));
                                    console.log(reduxStore.getState());
                                    this.setState({userID:jsonResponse['userID']});
                                    this.setState({loginState:true});
                                }
                                else if(jsonResponse['authState'] === 1)
                                {
                                    this.setState({warningTags: '用户名或密码错误！' });
                                }
                                else{
                                    this.setState({warningTags: '未知返回值' });
                                }
                            }
                            catch (e) {
                                this.setState({warningTags: '服务器返回值有错误！'});
                            }
                        })
                        .catch((err) => {
                            try {
                                this.setState({warningTags: '与服务器连接发生错误！错误码：' + err.response.status.toString()});
                            }
                            catch(e)
                            {
                                this.setState({warningTags: err.toString()});
                            }
                        });
                }
                catch (e) {
                    console.log('err');
                }
            }
            else {
                this.setState({warningTags: '密码应大于6位'});
            }//Passwd is too short.
        }
        else {
            this.setState({warningTags: '用户名与密码不可为空'});
        }//usrname and passwd can not be null
    }

    registerButtonClick(){
        window.location.href='/register/reg.html';
    }
    render() {
        if(this.state.loginState)
        {
            return (
                <Redirect to={'/home/' + this.state.userID}/>
            );
        }
        return (
            <div style={loginStyle}>
                <img src={logo} alt='Logo'/>
                <FormGroup className='formBasicText' role='form'>
                    <br/>
                    <FormControl type='text' placeholder='用户名' onChange={this.usrNameOnChange}
                                 onKeyUp={(arg) => {if(arg.keyCode === 13)this.loginButtonOnClick()}}>
                    </FormControl>
                    <br/>
                    <FormControl type='password' placeholder='密码' onChange={this.usrPassWDOnChange}
                                 onKeyUp={(arg) => {if(arg.keyCode === 13)this.loginButtonOnClick()}}>
                    </FormControl>
                    <br/>
                    <div style={{marginLeft:'10%',width:'35%',float:'left'}}>
                        <Button bsStyle={'primary'} onClick={this.loginButtonOnClick} block>登录</Button>
                    </div>
                    <div style={{marginRight:'10%',width:'35%',float:'right'}}>
                        <Button bsStyle={'danger'} onClick={this.registerButtonClick} block>注册</Button>
                    </div>
                </FormGroup>
                <br/><br/>
                <span id='error-warning-board' style={{'color': 'red', 'fontSize': '10px'}}>
                    {this.state.warningTags}&nbsp;
                </span>
            </div>
        );
    }
}

export default LoginDialog;
