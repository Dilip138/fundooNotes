import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/loginComponent";
import Register from "./component/registerComponent";
import ForgotPassword from './component/forgotComponent';
import "./App.css";
import ResetPassword from './component/resetComponent';
import dashBoard  from './component/dashBoardComponent';
import drawer from './component/drawer'
import createNotes from './component/createNotesComponent';
import getNotes from'./component/getNoteComponent';
import editNote from './component/editNoteComponent';
import archive from './component/getArchive';
import reminders from './component/getReminders';
import trash from './component/getTrash';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/forgot" component={ForgotPassword}></Route>
        <Route path="/resetpassword/:id" component={ResetPassword}></Route>
        <Route path="/dashBoard" component={dashBoard}></Route>
        <Route path="/createNotes" component={createNotes}></Route>
        <Route path="/drawer" component={drawer}></Route>
        <Route path="/getNotes" component={getNotes}></Route>
        <Route path="/editNote" component={editNote}></Route>
        <Route path="/archive" component={archive}></Route>
        <Route path="/reminders" component={reminders}></Route>
        <Route path="/trash" component={trash}></Route>

      </Switch>
    </Router>
  );
}

export default App;
