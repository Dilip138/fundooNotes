import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/loginComponent";
import Register from "./components/registerComponent";
import ForgotPassword from './components/forgotComponent';
import "./App.css";
import ResetPassword from './components/resetComponent';
import dashBoard from './components/dashBoardComponent';
import drawer from './components/drawer'
import createNotes from './components/createNotesComponent';
import getNotes from './components/getNoteComponent';
import moreMenu from './components/moreComponent';
import archive from './components/getArchive';
import reminders from './components/getReminders';
import trash from './components/getTrash';
import colorComponent from './components/colorComponent';
import profile from './components/profileComponent';
import imageUpload from './components/imageUploadComponent';
import collaborators from './components/collaboratorComponents';
import askQuestion from './components/askQuestionComponent';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/forgot" component={ForgotPassword}></Route>
        <Route path="/resetpassword/:id" component={ResetPassword}></Route>
        <Route path="/dashBoard" component={dashBoard}></Route>
        <Route path="/createNotes" component={createNotes}></Route>
        <Route path="/drawer" component={drawer}></Route>
        <Route path="/getNotes" component={getNotes}></Route>
        <Route path="/moreMenu" component={moreMenu}></Route>
        <Route path="/archive" component={archive}></Route>
        <Route path="/reminders" component={reminders}></Route>
        <Route path="/trash" component={trash}></Route>
        <Route path="/colorComponent" component={colorComponent}></Route>
        <Route path="/profile" component={profile}></Route>
        <Route path="/collaborators" component={collaborators}></Route>
        <Route path="/imageUpload" component={imageUpload}></Route>
        <Route path="/askQuestion" component={askQuestion}></Route>
      </Switch>
    </Router>
  );
}

export default App;
