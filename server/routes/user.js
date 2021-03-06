const express = require("express");
const router = express.Router({
  strict: true
});
const userController = require("../controllers/userController");
const md_auth = require("../middlewares/token_middleware");
const md_upload = require("../middlewares/upload_middleware");

const prefix = "/user";

router.get(`${prefix}`, userController.getUsers);

router.get(`${prefix}/:id`, userController.getUser);

router.post(`${prefix}/:id`, [md_auth.ensureToken, md_upload.uploadCover], userController.editUser);

module.exports = router;
