const express = require("express");
const router = express.Router({
  strict: true
});
const userController = require("../controllers/userController");

const prefix = "/user";

router.get(`${prefix}`, userController.getUsers);

router.get(`${prefix}/:id`, userController.getUser);

router.post(`${prefix}/:id`, userController.editUser);

module.exports = router;
