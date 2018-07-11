const express = require("express");
const router = express.Router({
  strict: true
});
const siteController = require("../controllers/siteController");

const prefix = "/donation";

router.get(`${prefix}`, siteController.getDonations);

router.get(`${prefix}/:id`, siteController.getDonation);

router.post(`${prefix}/:id`, siteController.editDonation);

router.put(`${prefix}`, siteController.setDonation);

module.exports = router;
