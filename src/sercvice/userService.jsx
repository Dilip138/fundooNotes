import axios from 'axios'
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api"


function userRegister(data) {
    console.log("Data", data);
    
    return axios.post(baseURL + '/user/userSignup',data)
}
 function userLogin(data) {
     console.log("login data",data);
     
    return axios.post(baseURL + '/user/login', data,{
    })
}
 function userForgot(data) {
    return axios.post(baseURL + '/forgot', (err, data) => {
        if (err) {
            return err;
        } else {
            return data; 
        }
    })
}
export default {userRegister, userLogin, userForgot} 