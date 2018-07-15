const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelSite = require("../models/site");
const config = require("../libs/config")

getSiteContent = (req, res) => {
  let lan = 'ES';

  if(req.params.lan) {
    lan = req.params.lan.toUpperCase();
  }
  
  modelSite.find({})
  .populate('stories', null,{ lan: lan })
  .populate('donations')
  .populate('faqs', null,{ lan: lan })
  .populate('timeline.lines', null,{ lan: lan })
  .exec((err, sites) => {
    if (err) return res.status(500).send({
      success: false,
      msg: `Problem to get all content`
    })

    res.status(200).send({
      success: true,
      site: sites[0]
    })
  })
};

getContent = (req, res) => {
  modelSite.find({})
  .exec((err, sites) => {
    if (err) return res.status(500).send({
      success: false,
      msg: `Problem to get all content`
    })

    res.status(200).send({
      success: true,
      site: sites[0]
    })
  })
};

setContent = (req, res) => {
  let body = req.body;
};

editContent = (req, res) => {
  let body = req.body;
  let id = req.params.id;

  let newDate = new Date();
  body.updatedAt = newDate;

  modelSite.findByIdAndUpdate(
    id,
    body, {
      new: true
    },
    (err, siteUpdated) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({
            success: false,
            msg: "Problem Editing HomePage"
          });
      }


      res.status(200).send({
        success: false,
        msg: `Edited`,
        data: siteUpdated
      })
    }
  );
};

module.exports = {
  getSiteContent,
  getContent,
  setContent,
  editContent
};