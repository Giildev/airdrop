const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelUser = require("../models/user");
const config = require("../libs/config")

login = (req, res) => {
  let body = req.body;
  let auth = {};
  // console.log(JSON.stringify(body));
  modelUser.findOne(
    {
      $or: [{
        userName: body.userName
      }, {
        email: body.email
      }]
    },
    "userName password email _id password",
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ success: false, msg: "problem" });
      }

      if (user === null) {
        return res.status(404).send({
          success: false,
          msg: "Incorrect User / Email, try again"
        });
      }

      decryptedPass = bcrypt.compareSync(body.password, user.password);

      if (!decryptedPass) {
        return res.status(404).send({
          success: false,
          code: 404,
          msg: "Incorrect password, try again"
        });
      }

      delete user._doc.password

      const token = jwt.sign({ user }, config.SECRET_KEY, {
        expiresIn: "999d"
      });

      const lastedEnter = new Date();

      modelUser.findOneAndUpdate(
        { userName: user.userName },
        { $set: { access_token: token, lastedEnter: lastedEnter } },
        { new: true },
        (err, user_w_t) => {
          //user_with_token
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send({ success: false, msg: "problem saving the token" });
          }

          if (user_w_t.access_token.length > 0) console.log("token save it");
        }
      );

      auth.access_token = token; // assign token to return user with specific data.
      auth.user = user.userName;
      res.status(200).send({ success: true, auth: auth });
    }
  );
}

register = (req, res) => {
  const body = req.body;
  const User = new modelUser();

  if(body.userName && body.email && body.password) {

    User.userName = body.userName.toLowerCase()
    User.email = body.email

    modelUser.find({ $or: [
      { email: User.email.toLowerCase() },
      { userName: User.userName },
    ] }) .exec((err, users) => {
      if(err) return res.status(500).send({ success: false, msg: 'Error getting user to compare'})

      if(users && users.length >= 1) return res.status(200).send({ success: false, msg: 'User already exiasdst'})
    })

    bcrypt.hash(body.password, null, null, (err, hash) => {
      User.password = hash

      User.save((error, userStored) => {
        if(error) return res.status(500).send({ success: false, msg: `Error Register user` })

        if( userStored ) {
          res.status(200).send({ success: true, msg: `Registered user...Welcome` })
        } else {
          res.status(404).send({ success: false, msg: `Can't save user` })
        }
      })
    })

  } else {
    res.status(200).send({ success: false, msg: `Don't leave empty fields` })
  }
}

module.exports = {
  login,
  register
};