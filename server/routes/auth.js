const express = require("express");
const router = express.Router({
  strict: true
});
const authController = require("../controllers/authController");

const prefix = "/auth";

router.get(`${prefix}/login`, authController.login);

router.post(`${prefix}/register`, authController.register);

module.exports = router;
