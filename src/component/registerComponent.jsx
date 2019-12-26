/******************************************************************************************
* @purpose : User Interface -Responsive design to support multiple resolution for Registration page
* @file : registerComponent.jsx
* @module : state,props,Login,snackBarOpen,snackBarMsg
* @author : Dilip
* @version : 1.0
* @since : 9-Nov-2019
******************************************************************************************/
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Card, Button, IconButton } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import {userRegister} from "../sercvice/userService";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      snackbarMsg: "",
      snackbarOpen: false
    };
  }
  handleLogin = () => {
    this.props.history.push("/login");
  };
  handleSubmit = () => {
    if (this.state.firstName === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Firstname cann't be empty"
      });
    } else if (!/^[A-Za-z]+$/.test(this.state.firstName)) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "firstname must be alphabets"
      });
    } else if (this.state.lastName === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "lastname cann't be empty"
      });
    } else if (!/^[A-Za-z]+$/.test(this.state.lastName)) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "lastname must be alphabets"
      });
    } else if (this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Email cann't be empty..!!"
      });
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid Email..!"
      });
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Password cann't be empty..!!"
      });
    } else if (this.state.password.length < 8) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "password must be of atleast 8 characters..!!"
      });
    } else {
      console.log("register true");
      let data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        service: "basic"
      };
      userRegister(data)
        .then(res => {
          console.log("res in register---------", res);
          this.props.history.push("/login");
          this.setState({
            snackbarOpen: true,
            snackbarMsg: " successfully!!"
          });
        })
        .catch(err => {
          console.log("err in login component ", err);
        });
    }
  };
  snackbarClose = e => {
    this.setState({
      snackbarOpen: false
    });
  };
  handleFirstNameChange = event => {
    const firstName = event.target.value;
    this.setState({
      firstName: firstName
    });
  };
  handleLastNameChange = event => {
    const lastName = event.target.value;
    this.setState({
      lastName: lastName
    });
  };
  handleEmailChange = event => {
    const email = event.target.value;
    this.setState({
      email: email
    });
  };
  handlePasswordChange = event => {
    const password = event.target.value;
    this.setState({
      password: password
    });
  };
  handleconfirmPasswordChange = event => {
    const confirmPassword = event.target.value;
    this.setState({
      confirmPassword: confirmPassword
    });
  };
  render() {
    return (
      <div className="register-content">
        <Card className="register-card">
          <div className="d-flex justify-content-center" style=
            {{ font: "bold 25px Times New Roman" }}>
            <span class="text-primary" >F </span>
            <span class="text-danger">u</span>
            <span class="text-warning">n</span>
            <span class="text-primary">d</span>
            <span class="text-danger"> o</span>
            <span class="text-success">o</span>
          </div>
          <div style={{ color: "black", fontSize: 20, fontFamily: "TimesNewRoman", textAlign: "center", marginTop: "5%" }} >
            <b>Create your Fundoo Account</b>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="fname"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="lname"
                value={this.state.lastName}
                onChange={this.handleLastNameChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                name="email"
                label="Email Id"
                fullWidth
                autoComplete="eid"
                value={this.state.email}
                onChange={this.handleEmailChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                type="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="pwd"
                value={this.state.password}
                onChange={this.handlePasswordChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label="confirmPassword"
                fullWidth
                autoComplete="cnpwd"
                value={this.state.confirmPassword}
                onChange={this.handleconfirmPasswordChange} />
            </Grid>
          </Grid>
          <div id="signup">
            <Button
              style={{ backgroundColor: "blue" }}
              type="button"
              value="submit"
              onClick={this.handleSubmit}>
              sign Up
            </Button>
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={this.handleLogin}>
                Sign in instead
              </Link>
            </Grid>
          </Grid>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
          action={[
            <IconButton onClick={this.handleClose}>
              <CloseIcon onClick={this.snackbarClose} />
            </IconButton>
          ]} />
      </div>
    );
  }
}
export default withRouter(Register);
