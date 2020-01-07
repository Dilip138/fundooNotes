import axios from "axios";
import apiConstant from '../apiConstant/apiConstant';

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

export function imageUpload(data) {
  console.log("token", localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.imageUpload, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
}


