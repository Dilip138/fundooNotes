import axios from "axios";
import apiConstant from '../sercvice/apiConstatnt';

export function userRegister(data) {
  console.log("Data", data);
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.signUp, data);
}

export function userLogin(data) {
  console.log("login data", data);
  console.log("token", localStorage.getItem("token"));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.login, data);
}

export function userForgot(data) {
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.forgot, data)
    .then(res => {
      console.log("success", res);
    })
    .catch(err => {
      console.log("err in reset", err);
    });
}

export function createNotes(data) {
  console.log("----------->", data);
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.createNotes , data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function getAllNotes() {
  return axios.get(process.env.REACT_APP_BASE_URL + apiConstant.getAllNotes, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function editNote(data) {
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.editNote, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function archiveNotes(data) {
  console.log("data in service for archive ", data, localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.archiveNotes, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function trashNotes(data) {
  console.log("data in service for trash ", data, localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.trashNotes, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
export function colorNotes(data) {
  console.log("data in service for color ", data, localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.colorNotes, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}



