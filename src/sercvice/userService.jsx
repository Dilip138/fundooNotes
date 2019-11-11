import axios from "axios";
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api";

function userRegister(data) {
  console.log("Data", data);
  return axios.post(baseURL + "/user/userSignup", data);
}
function userLogin(data) {
  console.log("login data", data);
  console.log("token", localStorage.getItem("token"));
  return axios.post(baseURL + "/user/login", data);
  // {
  //     headers: {
  //       Authorization: localStorage.getItem("token")
  //     }
  //   });
}
function userForgot(data) {
  return axios
    .post(baseURL + "/user/reset", data)
    .then(res => {
      console.log("success", res);
    })
    .catch(err => {
      console.log("err in reset", err);
    });
}
export default { userRegister, userLogin, userForgot };
