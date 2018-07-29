const express = require("express");
const modelSubscribe = require("../models/subscribe");

getSubscribedUsers = (req, res) => {
  modelSubscribe.find({ deleted: false })
  .exec((err, subscriber) => {
    if (err) return res.status(500).send({
      success: false,
      msg: `Problem to get all subscribers`
    })

    res.status(200).send({
      success: true,
      subscriber
    })
  })
};

setSubscribtion = (req, res) => {
  const { email } = req.body;

  if( email ) {
    const Subscription = new modelSubscribe(req.body);

    modelSubscribe.find({ email: email, deleted: false }, (err, subscribers) => {
      if (err) return res.status(500).send({
        success: false,
        msg: 'Error getting subscribers to compare'
      })

      if (subscribers && subscribers.length >= 1) return res.status(200).send({
        success: false,
        msg: 'This email is already subscribed'
      })

      Subscription.save((error, subscriptionStored) => {
        if (error) return res.status(500).send({
          success: false,
          msg: `Problem with server, try later`
        })

        if (!subscriptionStored) return res.status(404).send({
          success: true,
          msg: `Problem getting your subscription, try later`
        })

        res.status(200).send({
          success: true,
          msg: `Subscription registered successfully`,
        })
      })
    })
  }
};

editEmails = (req, res) => {
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
    modelSubscribe.findByIdAndUpdate(
      { _id: ids[i] },
      { $set: body },
      { new: true },
      (err, updatedEmail) => {
        if (err) {
          return res
            .status(500)
            .send({ success: false, msg: "Problem Editing subscriber" });
        }
        modifiedData.push(updatedEmail);
      }
    );
  }

  /* Refactor response ifelse by field */

  res.status(200).send({
    success: true,
    msg: "Subscribers modified successfully",
  })
};

module.exports = {
  getSubscribedUsers,
  setSubscribtion,
  editEmails,
};