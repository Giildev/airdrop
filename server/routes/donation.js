const express = require("express");
const router = express.Router({
  strict: true
});
const donationController = require("../controllers/donationController");

const prefix = "/donation";

router.get(`${prefix}`, donationController.getDonations); // get all donations

router.get(`${prefix}/:id`, donationController.getDonation); // get donation by id

router.post(`${prefix}/:id`, donationController.editDonation); // edit donation by id

router.put(`${prefix}`, donationController.setDonation); // create a donation

module.exports = router;
