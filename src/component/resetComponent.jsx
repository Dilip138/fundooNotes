import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import { TextField, Input } from '@material-ui/core';

class ResetComponent extends Component {
    render() {
        return (
            
       <div class="d-flex justify-content-center">
          <div className="card">
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
                  >

            </TextField>

            <Input 
                  type="password"
                  name="password"
                  placeholder="confirmPassword"
                  label="ConfirmPassword*"
                  >

            </Input>
            </div>
            
            </div>
            
        );
    }
}

export default ResetComponent;