import React,{Component} from 'react'
import  {FormControl,FormGroup,Button} from 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import * as Action from "../dataStore/Action";
import axios from "axios/index";
import {reduxStore} from "../dataStore/ReduxStore";

const registerFrom = {'textAlign':'center', 'minWidth':'800px'};
const registerGroup = {'height':'60px', 'width':'400px', 'margin': 'auto'};
const labelCommon = {'float': 'left'};
const inputCommon = {'width': '300px', 'float': 'right'};
const infoStyle = {'fontSize':'40px','height':'100px'};
export default class RegisterDialog extends Component{
    constructor(props){
        super(props);
        this.submitButtonOnClicked = this.submitButtonOnClicked.bind(this);
        this.userNameOnChange = this.userNameOnChange.bind(this);
        this.userPassWordOnChange = this.userPassWordOnChange.bind(this);
        this.userConfirmPassWordOnChange = this.userConfirmPassWordOnChange.bind(this);
        this.state = {userName:'',userPassWD:'',userConfirmPassWD:'',warningTags:''}
    }
    submitButtonOnClicked(){
        if (this.state.userName && this.state.userPassWD && this.state.userConfirmPassWD)
        {
            if (this.state.userPassWD.length >= 6) {
                const timeStamp = new Date().getTime();//Get Timestamp
                try {
                    axios.post('/Auth/Register',
                        {
                            userName: this.state.usrName,
                            userPassWD: this.state.userPassWD,
                            currentTime: timeStamp
                        },
                    )
                        .then((response) => {
                            try{
                                const jsonResponse = JSON.parse(JSON.stringify(response.data));
                                if(jsonResponse['authState'] === true)
                                {
                                    reduxStore.dispatch(Action.changeUsrState({userAuth:true,userCookies:jsonResponse['userID'],usrState:{}}));
                                    console.log(reduxStore.getState());
                                    this.setState({userID:jsonResponse['userID']});
                                    this.setState({loginState:true});
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
        console.log(this.state);
    }
    userNameOnChange(userName){
        if (userName.target.value) {
            this.setState({
                userName: userName.target.value,
            });
        }
    }
    userPassWordOnChange(usrPassWD){
        if (usrPassWD.target.value) {
            this.setState({
                userPassWD: usrPassWD.target.value,
            });
        }
    }
    userConfirmPassWordOnChange(usrPassWDConfirm){
        if (usrPassWDConfirm.target.value) {
            this.setState({
                userConfirmPassWD: usrPassWDConfirm.target.value,
            });
        }
    }
    render(){
        return(
            <FormGroup style={registerFrom}>
                <br/>
                <div style={infoStyle}>注册加入大佬的行列</div>
                <div style={registerGroup}>
                    <label style={labelCommon}>用户名</label>
                    <FormControl style={inputCommon} type="text" onChange={this.userNameOnChange}/>
                </div>
                <div style={registerGroup}>
                    <label style={labelCommon}>密码</label>
                    <FormControl style={inputCommon} type="password" onChange={this.userPassWordOnChange}/>
                </div>
                <div style={registerGroup}>
                    <label style={labelCommon}>重复密码</label>
                    <FormControl style={inputCommon} type="password" onChange={this.userConfirmPassWordOnChange}/>
                </div>
                <Button onClick={this.submitButtonOnClicked}>注册账户</Button><br/><br/>
                <span id='error-warning-board' style={{'color': 'red', 'fontSize': '10px'}}>
                    {this.state.warningTags}&nbsp;
                </span>
            </FormGroup>
        );
    }
}