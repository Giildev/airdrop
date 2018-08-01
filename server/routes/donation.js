const express = require("express");
const router = express.Router({
  strict: true
});
const donationController = require("../controllers/donationController");
const md_auth = require("../middlewares/token_middleware");
const md_upload = require("../middlewares/upload_middleware");

const prefix = "/donation";

router.get(`${prefix}`, md_auth.ensureToken, donationController.getDonations); // get all donations

router.get(`${prefix}/:id`, donationController.getDonation); // get donation by id

router.post(`${prefix}/:id`, [md_auth.ensureToken, md_upload.uploadCover], donationController.editDonation); // edit donation by id

router.put(`${prefix}`, [md_auth.ensureToken, md_upload.uploadCover], donationController.setDonation); // create a donation

module.exports = router;
