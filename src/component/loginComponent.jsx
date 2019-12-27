/******************************************************************************************
 * @purpose : User Interface -Responsive design to support multiple resolution for Login page
 * @file : loginComponent.jsx
 * @module : state,props,Login,snackBarOpen,snackBarMsg
 * @author : Dilip
 * @version : 1.0
 * @since : 9-Nov-2019
 ******************************************************************************************/
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { userLogin } from "../sercvice/userService";
import { IconButton, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
// import Input from "@material-ui/core/Input";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      snackbarMsg: "",
      showPassword: false,
      snackbarOpen: false,
      visible: false
    };
  }
  handleRegister = () => {
    this.props.history.push("/register");
  };
  handleForgot = () => {
    this.props.history.push("/forgot");
  };
  snackbarClose = e => {
    this.setState({
      snackbarOpen: false
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
  handleSubmit = () => {
    if (this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Email cann't be empty..!!"
      });
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      console.log(
        "entered",
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      );
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
      console.log("Login true");
      let data = {
        email: this.state.email,
        password: this.state.password
      };
      userLogin(data)
        .then(res => {
          console.log("res in login---------", res.data.id);
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("token", res.data.id);
          this.setState({
            snackbarOpen: true,
            snackbarMsg: "Login successfully!!"
          });
          this.props.history.push("/dashboard");
        })
        .catch(err => {
          console.log("err in login component ", err);
        });
    }
  };
  handleVisibility = () => {
    this.setState({
      visible: !this.state.visible
    });
  };
  render() {
    return (
      <div class="d-flex justify-content-center">
        <Card
          className="d-flex flex-column justify-content-center"
          style={{ width: "30%", marginTop: "10%" }}>
          <div className="d-flex justify-content-center" style=
            {{ font: "bold 25px Times New Roman" }}>
            <span class="text-primary" >F </span>
            <span class="text-danger">u</span>
            <span class="text-warning">n</span>
            <span class="text-primary">d</span>
            <span class="text-danger"> o</span>
            <span class="text-success">o</span>
          </div>
          <div id="signin">
            <div style={{ color: "black", fontSize: 25, textAlign: "center" }}>
              <b>Sign In</b>
            </div>
          </div>
          <div id="continue">
            <div
              class="d-flex justify-content-center"
              style={{ fontSize: 25, fontFamily: "TimesNewRoman" }} >
              Continue to fundoo
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-center">
              <TextField
                type="email"
                name="email"
                placeholder="Email"
                id="standard-basic"
                label="Email id*"
                value={this.state.email}
                onChange={this.handleEmailChange} />
            </div>
            <div class="d-flex justify-content-center">
              <TextField
                type={!this.state.visible ? "password" : "text"}
                name="password"
                placeholder="password"
                id="standard-basic"
                label="Password*"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleVisibility}>
                      {!this.state.visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                } />
            </div>
          </div>
          <div class="d-flex justify-content-around" style={{ marginTop: "4%", marginBottom: "4%" }}>
            <div>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={this.handleRegister}>
                    Create account
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={this.handleForgot}>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </div>
            <Button
              class="btn btn-primary btn-sm"
              type="button"
              value="submit"
              onClick={this.handleSubmit}>
              log in
            </Button>
          </div>
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
export default withRouter(Login);
