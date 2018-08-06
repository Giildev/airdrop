const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelHiwcard = require("../models/hiwcard");
const modelSite = require("../models/site");
const config = require("../libs/config")

getHiwcards = (req, res) => {
  modelHiwcard.find({deleted: false}, (err, cards) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get all cards` })

    res.status(200).send({ success: true, hiwcards: cards })
  })
};

getHiwcard = (req, res) => {
  let id = req.params.id;

  modelHiwcard.findById(id, (err, cards) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get card` })

    res.status(200).send({ success: true, hiwcard: cards })
  })
};

setHiwcard = (req, res) => {
  const { title, content, cover, lan } = req.body;
  const Card = new modelHiwcard();

  if ( title && cover && content && lan ) {

    Card.title = title;
    Card.cover = cover;
    Card.content = content;
    Card.lan = lan.toUpperCase();
    Card.site = req.user.site;

    // Check for duplicates
    modelHiwcard.find({ title: Card.title, deleted: false }, (err, cards) => {
      if(err) return res.status(500).send({ success: false, msg: 'Error getting cards to compare'});

      // if exist 1 or more stories story already posted and break statement
      if(cards && cards.length >= 1) return res.status(200).send({ success: false, msg: 'Card already posted'});

      // Save Story into DB
      Card.save((error, storedCard) => {
        if (error) return res.status(500).send({
          success: false,
          msg: `Error saving card`
        });

        if (storedCard) {

          modelSite.update(
            { _id: req.user.site },
            { $push: { hiwcard: storedCard._id } },
            (err, siteUpdated) => {
              if (err) return res.status(500).send({
                success: false,
                msg: `Error saving card`
              });
              
              res.status(200).send({
                success: true,
                msg: `Registered card succesfully`,
                data: storedCard
              })
            }
          )
        } else {
          res.status(404).send({
            success: false,
            msg: `Can't save card`
          })
        }
      })
    })

  } else {
    res.status(200).send({
      success: false,
      msg: `Don't leave empty fields`
    })
  }
};

editHiwcard = (req, res) => {
  let body = req.body;
  let ids = req.params.id.split(",");

  let modifiedData = [];

  let newDate = new Date();
  if (body.hasOwnProperty("deleted")) {
    body.deletedAt = newDate;
  } else {
    body.updatedAt = newDate;
  }

  for (const i in ids) {
    modelHiwcard.findByIdAndUpdate(
      ids[i],
      body,
      { new: true },
      (err, updatedCard) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ success: false, msg: "Problem Editing Cards" });
        }

        modifiedData.push(updatedCard)
      }
    );
  }

  res.status(200).send({
    success: true,
    msg: "All stories modified successfully",
    data: updatedCard
  })
};

module.exports = {
  getHiwcard,
  getHiwcards,
  setHiwcard,
  editHiwcard
};