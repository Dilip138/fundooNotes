import React, { Component } from 'react';
import DashBoardComponent  from '../component/dashBoardComponent';
class dashBoardPage extends Component {
    render() {
        return (
            <div>
                <DashBoardComponent props ={this.props}/>
            </div>
        );
    }
}
export default dashBoardPage;