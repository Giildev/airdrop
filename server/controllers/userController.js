const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelUser = require("../models/user");
const config = require("../libs/config")

getUsers = (req, res) => {
  modelUser.find({}, (err, users) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get all donations` })

    res.status(200).send({ success: true, data: users })
  })
}

getUser = (req, res) => {
  let id = req.params.id;

  modelUser.find({ _id: id }, (err, user) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get user` })

    res.status(200).send({ success: true, data: user })
  })
}

editUser = (req, res) => {
  let body = req.body;
  let id = req.params.id.split(",");

  let newDate = new Date();
  body.updatedAt = newDate;


  if (body.password) {
    let encryptedPass = bcrypt.hashSync(body.password, null)
    body.password = encryptedPass;
  }


  modelUser.findByIdAndUpdate(
    id,
    body,
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ success: false, msg: "Problem Editing Donation" });
      }

      res.status(200).send({
        success: true,
        msg: "Data modified successfully"
      })
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  editUser,
};