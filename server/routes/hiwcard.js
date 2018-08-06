const express = require("express");
const router = express.Router({
  strict: true
});
const hiwcardController = require("../controllers/hiwcardController");
const md_auth = require("../middlewares/token_middleware");
const md_upload = require("../middlewares/upload_middleware");

const prefix = "/hiwcard";

router.get(`${prefix}`, hiwcardController.getHiwcards); // get all hiwcard

router.get(`${prefix}/:id`, md_auth.ensureToken, hiwcardController.getHiwcard); // get hiwcard by id

router.post(`${prefix}/:id`, [md_auth.ensureToken, md_upload.uploadCover], hiwcardController.editHiwcard); // edit hiwcard by id

router.put(`${prefix}`, [md_auth.ensureToken, md_upload.uploadCover], hiwcardController.setHiwcard); // create a hiwcard

module.exports = router;
