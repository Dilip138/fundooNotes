import axios from "axios";
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api";

export function userRegister(data) {
  console.log("Data", data);
  return axios.post(baseURL + "/user/userSignup", data);
}
export function userLogin(data) {
  console.log("login data", data);
  console.log("token", localStorage.getItem("token"));
  return axios.post(baseURL + "/user/login", data);
}
export function userForgot(data) {
  return axios.post(baseURL + "/user/reset", data)
    .then(res => {
      console.log("success", res);
    })
    .catch(err => {
      console.log("err in reset", err);
    });
}
export function createNotes(data) {
  console.log("----------->", data);
  return axios.post(baseURL + "/notes/addNotes", data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function getAllNotes() {
  return axios.get(baseURL + "/notes/getNotesList", {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function editNote(data) {
  return axios.post(baseURL + "/notes/updateNotes", data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function archiveNotes(data) {
  console.log("data in service for archive ", data, localStorage.getItem('token'));
  return axios.post(baseURL + "/notes/archiveNotes", data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function trashNotes(data) {
  console.log("data in service for trash ", data, localStorage.getItem('token'));
  return axios.post(baseURL + "/notes/trashNotes", data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function colorNotes(data) {
  console.log("data in service for trash ", data, localStorage.getItem('token'));
  return axios.post(baseURL + "/notes/changesColorNotes", data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}



