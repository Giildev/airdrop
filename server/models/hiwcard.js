const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const hiwCard = new Schema({
  title: { type: String }, 
  content: { type: String },
  cover: { type: String },
  lan: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
  deleted: { type: Boolean, default: false },
  site: { type: Schema.ObjectId, ref: 'site' }
});

const HiwCard = mongoose.model("hiwcard", hiwCard);

module.exports = HiwCard;
