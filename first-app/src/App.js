import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.svg';
import './App.css';

export class MainTitle extends Component {
    constructor(props){
        super(props);
        this.timeUpdateCallBack = this.timeUpdateCallBack.bind(this);
        const time = new Date().toLocaleTimeString();
        this.state = {currentTime:time}
        setInterval(this.timeUpdateCallBack,1000);
    }
    timeUpdateCallBack(){
        const time = new Date().toLocaleTimeString();
        this.setState({currentTime:time});
    }
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='Logo'>
                    </img>
                    <h1 className='App-title'>网站主页</h1>
                </header>
                <p className='App-intro'>
                    <br/>当前时间：{this.state.currentTime}
                </p>
            </div>
        )
    }
}