const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelSite = require("../models/site");
const modelDonation = require("../models/donation");
const config = require("../libs/config")

getDonations = (req, res) => {
    modelDonation.find({}, (err, donations) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get all donations` })

    res.status(200).send({ success: true, data: donations })
  })
};

getDonation = (req, res) => {
  let id = req.params.id;

  modelDonation.find({ _id: id }, (err, donations) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get donation` })

    res.status(200).send({ success: true, data: donations })
  })
};

setDonation = (req, res) => {
  const { coin, icon, wallet, symbol, QR } = req.body;
  const Donation = new modelDonation();

  if( coin && icon && wallet && symbol && QR) {

    Donation.coin = coin;
    Donation.icon = icon;
    Donation.wallet = wallet;
    Donation.symbol = symbol;
    Donation.QR = QR;
    Donation.site = '5b479f121f22d372dfb0f433';

    // Save Donation into DB
    modelDonation.find({ wallet: Donation.wallet }, (err, donations) => {
      if(err) return res.status(500).send({ success: false, msg: 'Error getting donations to compare'})

      if(donations && donations.length >= 1) return res.status(200).send({ success: false, msg: 'donations already used'})

      Donation.save((error, donationStored) => {
        if(error) return res.status(500).send({ success: false, msg: error }) 

        if (donationStored) {
          modelSite.update(
            { _id: '5b479f121f22d372dfb0f433' },
            { $push: { donations: donationStored._id } },
            (err, siteUpdated) => {
              if (err) return res.status(500).send({
                success: false,
                msg: `Error saving story`
              });

              res.status(200).send({
                success: true,
                msg: `Registered donation`,
                data: donationStored
              })
            }
          )
        } else {
          res.status(404).send({
            success: false,
            msg: `Can't save donation`
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

editDonation = (req, res) => {
  let body = req.body;
  let ids = req.params.id.split(",");

  let newDate = new Date();
  if (body.hasOwnProperty("deleted")) {
    body.deletedAt = newDate;
  } else {
    body.updatedAt = newDate;
  }

  for (const i in ids) {
    modelDonation.findByIdAndUpdate(
      { _id: ids[i] },
      { $set: body },
      { new: true },
      (err, donation) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ success: false, msg: "Problem Editing Donation" });
        }
      }
    );
  }

  res.status(200).send({
    success: true,
    msg: "All Donations modified successfully"
  })
};

module.exports = {
  setDonation,
  getDonations,
  getDonation,
  editDonation
};