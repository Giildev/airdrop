const express = require("express");
const router = express.Router({
  strict: true
});
const storyController = require("../controllers/storyController");
const md_auth = require("../middlewares/token_middleware");
const md_upload = require("../middlewares/upload_middleware");

const prefix = "/story";

router.get(`${prefix}`, storyController.getStories); // get all stories

router.get(`${prefix}/:id`, md_auth.ensureToken, storyController.getStory); // get story by id

router.post(`${prefix}/:id`, [md_auth.ensureToken, md_upload.uploadCover], storyController.editStory); // edit story by id

router.put(`${prefix}`, [md_auth.ensureToken, md_upload.uploadCover], storyController.setStory); // create a story

module.exports = router;
