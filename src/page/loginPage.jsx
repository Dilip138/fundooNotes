import Login from '../component/loginComponent';
import { Component } from 'react';
export default class LoginPage extends Component{
    render(){
        return(
            <div>
                <Login props ={this.props}/>
            </div>
        )
    }
}