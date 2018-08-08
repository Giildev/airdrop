const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelSite = require("../models/site");
const modelDonation = require("../models/donation");
const config = require("../libs/config")

getDonations = (req, res) => {
    modelDonation.find({
          'deleted': false
        }, (err, donations) => {
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
  
  if( coin && icon && wallet && symbol) {
    
    const Donation = new modelDonation(req.body);
    Donation.site = req.user.site;

    // Save Donation into DB
    modelDonation.find({ wallet: Donation.wallet, deleted: false }, (err, donations) => {
      if(err) return res.status(500).send({ success: false, msg: 'Error getting donations to compare'})

      if(donations && donations.length >= 1 ) return res.status(200).send({ success: false, msg: 'donations already used'})

      Donation.save((error, donationStored) => {
        if(error) return res.status(500).send({ success: false, msg: error }) 

        if (donationStored) {
          modelSite.update(
            { _id: req.user.site },
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

  let modifiedData = [];

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
      (err, updatedDonation) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ success: false, msg: "Problem Editing Donation" });
        }
        modifiedData.push(updatedDonation);
      }
    );
  }

  res.status(200).send({
    success: true,
    msg: "All Donations modified successfully",
    data: modifiedData
  })
};

module.exports = {
  setDonation,
  getDonations,
  getDonation,
  editDonation
};