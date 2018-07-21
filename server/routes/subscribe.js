const express = require("express");
const router = express.Router({
  strict: true
});
const subscribeController = require("../controllers/subscribeController");

const prefix = "/subscribe";

router.get(`${prefix}`, subscribeController.getSubscribedUsers);

router.put(`${prefix}`, subscribeController.setSubscribtion);

module.exports = router;
