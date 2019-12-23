import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import { TextField, Input, Button } from '@material-ui/core';

class ResetComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      confirmPassword: ''
    }
  }
  handleSubmit = () => {
    this.props.history.push('login')
  }
  render() {
    return (
      <div class="d-flex justify-content-center">
        <div className="card">
          <div className="d-flex justify-content-center" style=
            {{ font: "bold 25px Times New Roman" }}>
            <span class="text-primary" >F </span>
            <span class="text-danger">u</span>
            <span class="text-warning">n</span>
            <span class="text-primary">d</span>
            <span class="text-danger"> o</span>
            <span class="text-success">o</span>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-center">
              <TextField
                type="email"
                name="email"
                placeholder="Email"
                id="standard-basic"
                label="Email id*" />
            </div>
            <div class="d-flex justify-content-center">
              <TextField
                type="password"
                name="password"
                placeholder="password"
                id="standard-basic"
                label="Password*" />
            </div>
          </div>
          <div class="d-flex justify-content-center" style={{marginTop:15}}>
            <Button
              class="btn btn-primary btn-sm"
              type="button"
              value="submit"
              onClick={this.handleSubmit}>
              submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetComponent;