import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, Button, Card, IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import userForgot from "../sercvice/userService";
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
    this.props.history.push("/login");
  };
  handleSubmit = () => {
    if (this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Email can not empty..!!"
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
    } else {
      console.log("Login true");
      let data = {
        email: this.state.email
      };
      userForgot
        .userForgot(data)
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
            <div className="fundoo-content">
              <span className="test1">F</span>
              <span className="test2">u</span>
              <span className="test3">n</span>
              <span className="test4">d</span>
              <span className="test5">o</span>
              <span className="test6">o</span>
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
                fullWidth
              />
            </div>
            <div className="back-next">
              <div>
                <Button
                  type="button"
                  value="submit"
                  style={{ backgroundColor: "blue" }}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  value="submit"
                  style={{ backgroundColor: "blue" }}
                  onClick={this.handleSubmit}
                >
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
            ]}
          />
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
