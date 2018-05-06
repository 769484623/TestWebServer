import React, {Component} from 'react';
import logo from '../logo2.png';
import './MainTitle.css';

export class MainTitle extends Component {
    constructor(props){
        super(props);
        this.timeUpdateCallBack = this.timeUpdateCallBack.bind(this);
        const time = new Date().toTimeString().split(' ')[0];
        this.state = {currentTime:time};
        setInterval(this.timeUpdateCallBack, 1000);
    }
    timeUpdateCallBack() {
        const time = new Date().toTimeString().split(' ')[0];
        this.setState({currentTime: time});
    }

    render() {
        return (
            <div>
                <div className='App-header'>
                    <table>
                        <tbody>
                        <tr>
                            <th>
                                <img src={logo} className='App-logo' alt='Logo'/>
                            </th>
                            <th className='App-intro'>
                                当前时间：{this.state.currentTime}
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}