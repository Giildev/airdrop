const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: { type: String, unique: true, required: true },
  subtitle: { type: String, required: true },
  cover: { type: String, required: true },
  content: { type: String, required: true },
  featured: { type: Boolean, default: false },
  main: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
});

const Story = mongoose.model("donations", storySchema);

module.exports = Story;
