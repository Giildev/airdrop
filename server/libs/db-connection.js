const mongoose = require("mongoose");
const config = require("./config");

let db;

connection = () => {
  if (!db) {
    db = mongoose.connect("mongodb://localhost:27017/" + config.airDB, {
      useNewUrlParser: true
    });
  }
};

module.exports = connection();
