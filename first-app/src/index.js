import React from 'react';
import ReactDOM from 'react-dom';
import {MainTitle} from './App';
import LoginDialog from './basicComponent/LoginDialog'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainTitle/>, document.getElementById('title'));
ReactDOM.render(<LoginDialog/>, document.getElementById('login-view'));
registerServiceWorker();