import React,{Component} from 'react'
import  {Modal,Button,Form,Input} from 'antd'
import '../../node_modules/antd/dist/antd.css'
import axios from "axios/index";

import sha256 from 'crypto-js/sha256';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const registerFrom = {'textAlign':'center'};
const registerGroup = {'width':'500px', 'margin': 'auto'};
const infoStyle = {'fontSize':'40px','textAlign':'center'};

export default class RegisterDialog extends Component{
    constructor(props){
        super(props);
        this.submitButtonOnClicked = this.submitButtonOnClicked.bind(this);
        this.userNameOnChange = this.userNameOnChange.bind(this);
        this.userPassWordOnChange = this.userPassWordOnChange.bind(this);
        this.userConfirmPassWordOnChange = this.userConfirmPassWordOnChange.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.usrInfoSending = this.usrInfoSending.bind(this);
        this.networkErr = this.networkErr.bind(this);
        this.state = {userName:'',userPassWD:'',userConfirmPassWD:'',warningTags:'',regSuccess:false}
    }

    networkErr(err){
        try {
            this.setState({warningTags: '与服务器连接发生错误！错误码：' + err.response.status.toString()});
        }
        catch(e)
        {
            this.setState({warningTags: err.toString()});
        }
    };

    usrInfoSending(timeStamp){
        axios.post('/Auth/Register',
            {
                userName: this.state.userName,
                userPassWD: this.state.userPassWD,
                currentTime: timeStamp
            },
            {
                headers:{
                    'X-CSRFToken':cookies.get('csrftoken')
                }
            })
            .then((response) => {
                try{
                    const jsonResponse = JSON.parse(JSON.stringify(response.data));
                    const serverRet = jsonResponse['authState'];
                    if(serverRet === 0x00)//OK
                    {
                        let modal = Modal.success({
                            title: '注册成功！',
                            content: (
                                <p>注册成功！三秒后跳转到登录主页……</p>
                            ),
                            onOk() {
                                window.location.href='/';
                            },
                        });
                        this.Timer = setInterval(() => {
                            modal.destroy();
                            clearInterval(this.Timer);
                            window.location.href='/';
                        },4000);
                    }
                    else if(serverRet === 0x01)//UserNameDuplication
                    {
                        this.setState({warningTags: '用户名已存在！'});
                    }
                    else {
                        this.setState({warningTags: '未知返回值'});
                    }
                }
                catch (e) {
                    this.setState({warningTags: '服务器返回值有错误！'});
                }
            })
            .catch((err) => {
                this.networkErr(err)
            });
    }

    submitButtonOnClicked(){
        if (this.state.userName && this.state.userPassWD)
        {
            if(this.state.userPassWD === this.state.userConfirmPassWD)
            {
                if (this.state.userPassWD.length >= 6) {
                    try {
                        axios.get('/Auth/Register')
                            .then(()=>{
                                this.usrInfoSending(new Date().getTime())
                            })
                            .catch((err) => {
                                this.networkErr(err);
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
                this.setState({warningTags: '两次输入的密码不一致'});
                console.log(this.state.userConfirmPassWD,this.state.userPassWD)
            }
        }
        else {
            this.setState({warningTags: '用户名与密码不可为空'});
        }//usrname and passwd can not be null
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
                userPassWD: sha256(usrPassWD.target.value).toString(),
            });
        }
    }
    userConfirmPassWordOnChange(usrPassWDConfirm){
        if (usrPassWDConfirm.target.value) {
            this.setState({
                userConfirmPassWD: sha256(usrPassWDConfirm.target.value).toString(),
            });
        }
    }
    onModalClose(){

    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return(
            <Form style={registerFrom}>
                <br/>
                <div style={infoStyle}>注册加入大佬的行列</div>
                <br/>
                <div style={registerGroup}>
                    <Form.Item {...formItemLayout} label={'用户名'}>
                        <Input type="text" onChange={this.userNameOnChange}/>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'密码'}>
                        <Input type="password" onChange={this.userPassWordOnChange}/>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'重复密码'}>
                        <Input type="password" onChange={this.userConfirmPassWordOnChange}/>
                    </Form.Item>
                    <Button type={'default'} htmlType={'submit'} onClick={this.submitButtonOnClicked}>注册账户</Button><br/><br/>
                    <span style={{'color': 'red', 'fontSize': '10px'}}>{this.state.warningTags}&nbsp;</span>
                </div>
            </Form>
        );
    }
}