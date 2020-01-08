const apiConstant = {
    signUp: "/user/userSignup",
    login: "/user/login",
    forgot: "/user/reset",
    createNotes: "/notes/addNotes",
    getAllNotes: "/notes/getNotesList",
    editNote: "/notes/updateNotes",
    archiveNotes: "/notes/archiveNotes",
    trashNotes: "/notes/trashNotes",
    colorNotes: "/notes/changesColorNotes",
    reminderNote: "/notes/addUpdateReminderNotes",
    imageUpload: "/user/uploadProfileImage",
    addCollaborators: " /notes/{id}/AddcollaboratorsNotes",
    searchUserList:"/user/searchUserList",
    addNoteLabels:"/noteLabels",
}
export default apiConstant;