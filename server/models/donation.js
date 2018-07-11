const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  coin: { type: String },
  icon: { type: String },
  wallet: { type: String },
  amount: { type: Number, default: 0.00 },
  symbol: { type: String, default: "" },
  QR: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
});

const Donation = mongoose.model("donations", donationSchema);

module.exports = Donation;
