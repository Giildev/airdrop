const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: { type: String }, // unique
  subtitle: { type: String },
  cover: { type: String },
  content: { type: String },
  featured: { type: Boolean, default: false },
  main: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
});

const Story = mongoose.model("story", storySchema);

module.exports = Story;
