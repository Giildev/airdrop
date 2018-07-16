const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const faqSchema = new Schema({
  question: { type: String },
  answer: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  deleted: { type: Boolean, default: false },
  lan: String,
  site: { type: Schema.ObjectId, ref: 'site' }
});

const FAQ = mongoose.model("faq", faqSchema);

module.exports = FAQ;
