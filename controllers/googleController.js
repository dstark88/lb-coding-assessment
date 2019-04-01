const axios = require("axios");
const db = require("../models");

// Defining methods for the Controller

// findAll searches the Google Notes API and returns only the entries we haven't already saved

// It also makes sure that the notes returned from the API all contain a title, author, link, description, and image
module.exports = {
  findAll: function(req, res) {
    const { query: params } = req;
    axios
      .get("https://www.googleapis.com/notes/v1/volumes", {
        params
      })
      .then(results =>
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      .then(apiNotes =>
        db.Note.find().then(dbNotes =>
          apiNotes.filter(apiNote =>
            dbNotes.every(dbNote => dbNote.googleId.toString() !== apiNote.id)
          )
        )
      )
      .then(notes => res.json(notes))
      .catch(err => res.status(422).json(err));
  }
};
