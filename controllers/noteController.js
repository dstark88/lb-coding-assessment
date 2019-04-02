const db = require("../models");

// Defining methods for the noteController
module.exports = {
  findAll: function(req, res) {
    db.Note.find(req.query)
      .then(dbNote => res.json(dbNote))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Note.findById(req.params.id)
      .then(dbNote => res.json(dbNote))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Note.create(req.body)
      .then(dbNote => res.json(dbNote))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Note.findOneAndUpdate({_id: req.params.id }, req.body)
      .then(dbNote => res.json(dbNote))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Note.findById({ _id: req.params.id })
      .then(dbNote => dbNote.remove())
      .then(dbNote => res.json(dbNote))
      .catch(err => res.status(422).json(err));
  }
};
