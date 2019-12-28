import React, { Component } from 'react';
import ForgotPassword from '../component/forgotComponent'
class ForgotPage extends Component {
    render() {
        return (
            <div>
                <ForgotPassword props ={this.props}/>
            </div>
        );
    }
}

export default ForgotPage;