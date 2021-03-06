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
  console.log("data in service for getNote ", localStorage.getItem('token'));
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

export function deleteNotes(data) {
  console.log("data in service for trash ", data, localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.deleteNotes, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function restoreNotes(data) {
  console.log("data in service for trash ", data, localStorage.getItem('token'));
  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.restoreNotes, data, {
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
  console.log("label data in services", data);

  return axios.post(process.env.REACT_APP_BASE_URL + apiConstant.createLabels, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function getNoteLabels() {
  return axios.get(process.env.REACT_APP_BASE_URL + apiConstant.getNoteLabel, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function noteLabels(data) {
  const noteId = data.noteId
  const lableId = data.lableId
  console.log("res in labelAllData",noteId);
  console.log("res in labelAllData",lableId);
  
  return axios.post(process.env.REACT_APP_BASE_URL + `/notes/${noteId}/addLabelToNotes/${lableId}/add`, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function addCollaborators(data, noteId) {
  return axios.post(`http://fundoonotes.incubation.bridgelabz.com/api/notes/${noteId}/AddcollaboratorsNotes`, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function removeCollaborator(data) {
  let id = data.noteId
  let collaboratorUserId = data.collaboratorUserId
  return axios.delete(`http://fundoonotes.incubation.bridgelabz.com/api/notes/${id}/removeCollaboratorsNotes/${collaboratorUserId}`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function askQuestion(data) {
  return axios.post("http://fundoonotes.incubation.bridgelabz.com/api/questionAndAnswerNotes/addQuestionAndAnswer", data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export function postLike(data) {
  return axios.post(`http://fundoonotes.incubation.bridgelabz.com/api/questionAndAnswerNotes/like/${data.id}`, data, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
