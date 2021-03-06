const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelTl = require("../models/timeline");
const modelSite = require("../models/site");
const config = require("../libs/config");

getTimeline = (req, res) => {
  modelTl
    .find({ deleted: false })
    .sort({
      createdAt: -1
    })
    .exec((err, lines) => {
      if (err)
        return res.status(500).send({
          success: false,
          msg: `Problem to get all lines`
        });

      res.status(200).send({
        success: true,
        timeline: lines
      });
    });
};

getLine = () => {
  let id = req.params.id;

  modelTl.find({ _id: id }, (err, line) => {
    if (err)
      return res
        .status(500)
        .send({ success: false, msg: `Problem to get line` });

    res.status(200).send({ success: true, data: line });
  });
};

setLine = (req, res) => {
  let body = req.body;
  const Line = new modelTl(body);

  Line.site = req.user.site;
  Line.lan = body.lan.toUpperCase();

  modelTl.find({ title: Line.title }, (err, faqs) => {
    if (err)
      return res
        .status(500)
        .send({ success: false, msg: "Error getting events to compare" });

    if (faqs && faqs.length >= 1)
      return res.status(200).send({
        success: false,
        msg: "line already posted"
      });

    Line.save((error, lineStored) => {
      if (error) return res.status(500).send({ success: false, msg: error });

      if (lineStored) {
        modelSite.update(
          { _id: req.user.site }, // se envia desde el front
          { $push: { "timeline.lines": lineStored._id } },
          (err, faqUpdated) => {
            if (err)
              return res.status(500).send({
                success: false,
                msg: `Error saving event`
              });

            res.status(200).send({
              success: true,
              msg: `Registered event succesfully`,
              data: lineStored
            });
          }
        );
      } else {
        res.status(404).send({
          success: false,
          msg: `Can't save event`
        });
      }
    });
  });
};

editLine = (req, res) => {
  let body = JSON.parse(req.body.data);
  let ids = req.params.id.split(",");
  let newDate = new Date();
  if (body.hasOwnProperty("deleted")) {
    body.deletedAt = newDate;
  } else {
    body.updatedAt = newDate;
  }

  for (const i in ids) {
    modelTl.findByIdAndUpdate(
      ids[i],
      body,
      {
        new: true
      },
      (err, lineStored) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            success: false,
            msg: "Problem Editing faqs"
          });
        }
      }
    );
  }

  res.status(200).send({
    success: true,
    msg: "All lines modified successfully"
  });
};

module.exports = {
  getTimeline,
  getLine,
  setLine,
  editLine
};
