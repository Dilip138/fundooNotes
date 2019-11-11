import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import { TextField } from '@material-ui/core';

class ResetComponent extends Component {
    render() {
        return (
            <div className="container-fluid">
        <div className="responsive">
          <Card className="card1">
            <div className="fundoo-content">
              <span className="test1">F</span>
              <span className="test2">u</span>
              <span className="test3">n</span>
              <span className="test4">d</span>
              <span className="test5">o</span>
              <span className="test6">o</span>
            </div>
            <TextField 
                  type="password"
                  name="password"
                  placeholder="password"
                  id="standard-basic"
                  label="Password*"
                  fullWidth>

            </TextField>

            <TextField 
                  type="password"
                  name="password"
                  placeholder="confirmPassword"
                  label="ConfirmPassword*"
                  fullWidth>

            </TextField>
            </Card>
            </div>
            </div>
        );
    }
}

export default ResetComponent;