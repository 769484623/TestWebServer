import React,{Component} from'react'

export class HomeView extends Component{
    constructor(props){
        super(props);
        this.params = {};
        for(let element in props.match.params){
            this.params[element] = props.match.params[element];
        }
    }
    render(){
        return (
            <div style={{'textAlign':'center'}}>
                <p>Your ID is :{this.params['ID']}</p>
                <p>Welcome.</p>
            </div>
        )
    }
}