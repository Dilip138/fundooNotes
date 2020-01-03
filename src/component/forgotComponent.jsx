import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, Button, Card, IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import {userForgot} from "../service/userService";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }
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
  handleBack = () => {
    this.props.history.push("/");
  };
  handleSubmit = () => {
    if (this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Email can not empty..!!"
      });
    }else {
      console.log("Login true");
      let data = {
        email: this.state.email
      };
      userForgot(data)
        .then(res => {
          console.log("res in login---------", res);
          localStorage.setItem("email", this.state.email);
          this.props.history.push("/reset");
          this.setState({
            snackbarOpen: true,
            snackbarMsg: "forgot process done successfully!!"
          });
        })
        .catch(err => {
          console.log("err in login component ", err);
        });
    }
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="responsive">
          <Card className="card1">
            <div className="d-flex justify-content-center" style=
              {{ font: "bold 25px Times New Roman" }}>
              <span class="text-primary" >F </span>
              <span class="text-danger">u</span>
              <span class="text-warning">n</span>
              <span class="text-primary">d</span>
              <span class="text-danger"> o</span>
              <span class="text-success">o</span>
            </div>
            <div className="yourEmail">Find Your Email</div>
            <div className="recoveryEmail">Enter Your Recovery Email Id</div>
            <div className="email">
              <TextField
                type="email"
                id="email"
                label="Email Id"
                name="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                fullWidth />
            </div>
            <div className="back-next">
              <div>
                <Button
                  type="button"
                  value="submit"
                  style={{ backgroundColor: "blue" }}
                  onClick={this.handleBack} >
                  Back
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  value="submit"
                  style={{ backgroundColor: "blue" }}
                  onClick={this.handleSubmit} >
                  Next
                </Button>
              </div>
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
              <IconButton>
                <CloseIcon onClick={this.snackbarClose} />
              </IconButton>
            ]} />
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
