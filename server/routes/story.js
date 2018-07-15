const express = require("express");
const router = express.Router({
  strict: true
});
const storyController = require("../controllers/storyController");
const md_auth = require("../middlewares/token_middleware");

const prefix = "/story";

router.get(`${prefix}`, storyController.getStories); // get all stories

router.get(`${prefix}/:id`, storyController.getStory); // get story by id

router.post(`${prefix}/:id`, storyController.editStory); // edit story by id

router.put(`${prefix}`, storyController.setStory); // create a story

module.exports = router;
