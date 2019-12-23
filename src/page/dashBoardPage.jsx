import React, { Component } from 'react';
import dashBoardComponent  from '../component/dashBoardComponent';
class dashBoardPage extends Component {
    render() {
        return (
            <div>
                <dashBoardComponent props ={this.props}/>
            </div>
        );
    }
}

export default dashBoardPage;