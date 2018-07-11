const express = require("express");
const router = express.Router({
  strict: true
});
const authController = require("../controllers/authController");

const prefix = "/user";

router.post(`${prefix}/login`, authController.login);

router.post(`${prefix}/register`, authController.register);

module.exports = router;
