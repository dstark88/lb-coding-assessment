import axios from "axios";

export default {
  // Gets all notes 
  getNotes: function() {
    return axios.get("/api/notes");
  },
  // Gets the note with the given id
  getNote: function(id) {
    return axios.get("/api/notes/" + id);
  },
  // // Gets the site with the given id
  findNotes: function(noteInfo) {
    return axios.post("/api/notes/", noteInfo);
  },
  createNotes: function(noteInfo) {
    return axios.post("/api/notes/", noteInfo);
  },
  // Deletes the saved note with the given id
  deleteNote: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  // Saves an book to the database
  saveNote: function(noteData) {
    return axios.post("/api/notes", noteData);
  },
  // Saves an note to the database
  getSavedNotes: function() {
    return axios.get("/api/notes");
  },
  updateNote: function(id) {
    return axios.put("/api/notes/", + id);
  }
};
