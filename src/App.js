import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/loginComponent";
import Register from "./component/registerComponent";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </Router>
  );
}

export default App;
