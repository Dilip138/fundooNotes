import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/loginComponent";
import Register from "./component/registerComponent";
import ForgotPassword from './component/forgotComponent';
import "./App.css";
import ResetPassword from './component/resetComponent';
import dashBoard  from './component/dashBoardComponent';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/forgot" component={ForgotPassword}></Route>
        <Route path="/resetpassword/:id" component={ResetPassword}></Route>
        <Route path="/dashBoard" component={dashBoard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
