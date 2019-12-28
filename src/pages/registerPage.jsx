import Register from '../component/registerComponent'
import { Component } from 'react';
export default class RegisterPage extends Component{
    render(){
        return(
            <div>
                <Register props = {this.props}/>
            </div>
        )
    }
}