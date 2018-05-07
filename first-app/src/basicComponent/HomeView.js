import React,{Component} from'react'
import {Redirect}  from 'react-router-dom'
import {reduxStore}  from '../dataStore/ReduxStore'
export class HomeView extends Component{
    constructor(props){
        super(props);
        this.params = {};
        for(let element in props.match.params){
            this.params[element] = props.match.params[element];
        }
    }
    render(){
        if(reduxStore.getState().userAuth === false)
        {
            return <Redirect to={'/'}/>
        }
        return (
            <div style={{'textAlign':'center'}}>
                <p>Your ID is :{this.params['ID']}</p>
                <p>Welcome.</p>
            </div>
        )
    }
}