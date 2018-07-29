// 'use strict';
const express = require("express");
const router = express.Router({ strict: true });
//const sharp = require("sharp");
const fs = require("fs");
const uniqid = require("uniqid");

router.post("/upload/cover", (req, res) => {
  // if (req.files !== null) {
  //   // resize and save img on React folder with MD5 name
  //   let imgName = `${uniqid()}.jpeg`;
  //   sharp(req.files.file.data)
  //     .resize(1920, 1080)
  //     .toFile(`${__dirname}/../../client/public/${imgName}`, err => {
  //       err ? console.log(err) : "";
  //     })
  //     .toBuffer()
  //     .then(() => {
  //       console.log(imgName);
  //       res.send({
  //         code: 200,
  //         imgName: imgName
  //       });
  //     });
  // } else {
  //   res.send({ code: 200, imgName: "same" });
  // }
});

router.post("/upload/avatar", (req, res) => {
  // if (req.files !== null) {
  //   // resize and save img on React folder with MD5 name
  //   let imgName = `${uniqid()}.${req.files.file.mimetype.split("/").pop()}`;
  //   sharp(req.files.file.data)
  //     .resize(512, 512)
  //     .toFile(`${__dirname}/../../client/public/${imgName}`, err => {
  //       if (err) {
  //         console.log("err uploading imge", err);
  //       } else {
  //         res.send({
  //           code: 200,
  //           imgName: imgName
  //         });
  //       }
  //     });
  // } else {
  //   res.send({ code: 200, imgName: "this.state.avatar" });
  // }
});

module.exports = router;
