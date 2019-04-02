const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/LBnoteDB"
);

const noteSeed = [
  {
    id: 0,
    body: "Learn Java!",
    date: { type: Date, default: Date.now },
  },
  {
    id: 1,
    body: "Ask Larry about the TSP reports.",
    date: { type: Date, default: Date.now },
  },
  {
    id: 2,
    body: "Pick up milk!",
    date: { type: Date, default: Date.now },
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