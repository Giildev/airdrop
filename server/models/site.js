const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const siteSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  access_token: String,
  password: { type: String, required: true },
  avatar: { type: String, default: "defaultAvatar.png" },
  donations: { type: Schema.ObjectId, ref: 'donations' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastedEnter: { type: Date, default: Date.now },
});

const Site = mongoose.model("site", siteSchema);

module.exports = Site;
