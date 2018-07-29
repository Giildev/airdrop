const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const timelineSchema = new Schema({
  title: String,
  event: String,
  start: Date,
  end: Date,
  lan: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  deleted: { type: Boolean, default: false },
  site: { type: Schema.ObjectId, ref: 'site' }
});

const Timeline = mongoose.model("timeline", timelineSchema);

module.exports = Timeline;
