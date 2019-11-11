import React, { Component } from 'react';
import ResetComponent from '../component/resetComponent'
class ResetPage extends Component {
    render() {
        return (
            <div>
                <ResetComponent props={this.props} />
            </div>
        );
    }
}

export default ResetPage;