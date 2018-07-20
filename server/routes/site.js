const express = require("express");
const router = express.Router({
  strict: true
});
const siteController = require("../controllers/siteController");
const md_auth = require("../middlewares/token_middleware");

const prefix = "/site";

router.get(`${prefix}/:lan?`, siteController.getSiteContent); // Get content

router.get(`${prefix}/manage/`, md_auth.ensureToken, siteController.getContent); // Get to edit it

router.put(`${prefix}`, md_auth.ensureToken, siteController.setContent); // Create content

router.post(`${prefix}/manage/:id`, md_auth.ensureToken, siteController.editContent); // Edit content

module.exports = router;
