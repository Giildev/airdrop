const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  access_token: String,
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "defaultAvatar.png"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastedEnter: { type: Date, default: Date.now },
  RRSS: {
    fb: String,
    steemit: String,
    twitter: String,
    reddit: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
