const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  email: { type: String },
  name: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  deleted: { type: Boolean, default: false },
});

const Subscribe = mongoose.model("subscrition", subscribeSchema);

module.exports = Subscribe;
