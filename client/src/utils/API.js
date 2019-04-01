import axios from "axios";

export default {
  // Gets notes from the Google API
  getNotes: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // Gets all saved notes
  getSavedNotes: function() {
    return axios.get("/api/notes");
  },
  // Deletes the saved note with the given id
  deleteNote: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  // Saves an note to the database
  saveNote: function(noteData) {
    return axios.post("/api/notes", noteData);
  }
};
