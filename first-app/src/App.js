import React from 'react'
import MainTitle from './basicComponent/MainTitle'
import LoginDialog from './basicComponent/LoginDialog'
import {HomeView} from './basicComponent/HomeView'
import {Switch, Route, Redirect} from 'react-router-dom';

export const App = () => (
    <div>
        <MainTitle/>
        <br/>
        <Switch>
            <Route exact path='/' component={LoginDialog}/>
            <Route path='/home/:ID' component={HomeView}/>
            <Redirect to="/"/>
        </Switch>
    </div>
);