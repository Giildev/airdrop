const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelSite = require("../models/site");
const modelDonation = require("../models/donation");
const config = require("../libs/config")

getContent = (req, res) => {
  console.log('getContent')
};

setContent = (req, res) => {
  console.log('setContent')
};

editContent = (req, res) => {
  console.log('editContent')
};

module.exports = {
  getContent,
  setContent,
  editContent
};