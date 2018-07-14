const express = require("express");
const router = express.Router({
  strict: true
});
const siteController = require("../controllers/siteController");

const prefix = "/site";

router.get(`${prefix}/:lan?`, siteController.getSiteContent); // Get content

router.get(`${prefix}/manage/`, siteController.getContent); // Get to edit it

router.put(`${prefix}`, siteController.setContent); // Create content

router.post(`${prefix}/manage/:id`, siteController.editContent); // Edit content

module.exports = router;
