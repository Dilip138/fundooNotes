import axios from "axios";
import apiConstant from '../apiConstant/apiConstant';

export function createNotes(data) {
  console.log("----------->", data);
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.createNotes, data, {
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
  console.log("token", localStorage.getItem('token'));
  console.log("data in service for color ", data, localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.colorNotes, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function reminderNotes(data) {
  console.log("token", localStorage.getItem('token'));
  console.log("data in service for reminder ", data, localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.reminderNote, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function addNoteLabels(data) {
  return axios.post(process.env.React_App_BASE_URL + apiConstant.addNoteLabels, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function addCollaborators(data) {
  return axios.post(process.env.React_App_BASE_URL + apiConstant.addCollaborators, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}