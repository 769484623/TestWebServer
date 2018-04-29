import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button,FormGroup,FormControl} from 'react-bootstrap';
import axios from 'axios';


class LoginDialog extends Component {
    constructor(props) {
        super(props);
        this.loginButtonOnClick = this.loginButtonOnClick.bind(this);
        this.usrNameOnChange = this.usrNameOnChange.bind(this);
        this.usrPassWDOnChange = this.usrPassWDOnChange.bind(this);
        this.state = {Name:'登录网站',args:0}
    }
    usrNameOnChange(usrName){
        if(usrName.target.value){
            this.setState({
                usrName:usrName.target.value,
            });
        }
    }
    usrPassWDOnChange(usrPassWD){
        if(usrPassWD.target.value){
            this.setState({
                userPassWD:usrPassWD.target.value,
            });
        }
    }
    loginButtonOnClick() {
        if(this.state.usrName && this.state.userPassWD){
            if(this.state.userPassWD.length >= 6)
            {
                const timeStamp = new Date().getTime();//Get Timestamp
                axios.post('/Auth',{userName:this.state.usrName,userPassWD:this.state.userPassWD,currentTime:timeStamp});
            }
            else{}//Passwd is too short.
        }
        else{}//usrname and passwd can not be null
    }
    render() {
        return (
            <div className='Login-Dialog'>
                <FormGroup className='formBasicText' role='form'>
                    <FormControl type='text' placeholder='用户名' onChange={this.usrNameOnChange}>
                    </FormControl>
                    <br/>
                    <FormControl type='password' placeholder='密码' onChange={this.usrPassWDOnChange}>
                    </FormControl>
                    <br/>
                </FormGroup>
                <Button bsStyle='primary' onClick={this.loginButtonOnClick}>
                    {this.state.Name}
                </Button>
                <br/>
            </div>
        );
    }
}

LoginDialog.propTypes = {
    serverAddress: PropTypes.string.isRequired
};

LoginDialog.defaultProps = {
    serverAddress: 'localhost:80'
};


export default LoginDialog;
