const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/LBnoteDB"
);

const noteSeed = [
  {
    _id: 0,
    body: "Learn Java!",
    date: new Date(Date.now())
  },
  {
    _id: 1,
    body: "Ask Larry about the TSP reports.",
    date: new Date(Date.now())
  },
  {
    _id: 2,
    body: "Pick up milk!",
    date: new Date(Date.now())
  },
]

db.Note
  .remove({})
  .then(() => db.Note.collection.insertMany(noteSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });