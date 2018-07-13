const express = require("express");
const router = express.Router({
  strict: true
});
const timelineController = require("../controllers/timelineController");
const md_auth = require("../middlewares/token_middleware");

const prefix = "/timeline";

router.get(`${prefix}`, timelineController.getTimeline); // get all stories

router.get(`${prefix}/:id`, timelineController.getLine); // get story by id

router.post(`${prefix}/:id`, timelineController.editLine); // edit story by id

router.put(`${prefix}`, timelineController.setLine); // create a story

module.exports = router;
