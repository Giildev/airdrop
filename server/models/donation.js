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
  lan: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
  deleted: { type: Boolean, default: false },
  site: { type: Schema.ObjectId, ref: 'site' }
});

const Donation = mongoose.model("donation", donationSchema);

module.exports = Donation;
