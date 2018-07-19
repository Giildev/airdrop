const express = require("express");
const router = express.Router({
  strict: true
});
const storyController = require("../controllers/storyController");
const md_auth = require("../middlewares/token_middleware");

const prefix = "/story";

router.get(`${prefix}`, md_auth.ensureToken, storyController.getStories); // get all stories

router.get(`${prefix}/:id`, md_auth.ensureToken, storyController.getStory); // get story by id

router.post(`${prefix}/:id`, md_auth.ensureToken, storyController.editStory); // edit story by id

router.put(`${prefix}`, md_auth.ensureToken, storyController.setStory); // create a story

module.exports = router;
