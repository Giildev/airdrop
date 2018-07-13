const express = require("express");
const router = express.Router({
  strict: true
});
const siteController = require("../controllers/siteController");

const prefix = "/site";

router.get(`${prefix}`, siteController.getContent); // Get content

router.put(`${prefix}`, siteController.setContent); // Create content

router.post(`${prefix}/:id`, siteController.editContent); // Edit content

module.exports = router;
