const express = require("express");
const router = express.Router({
  strict: true
});
const timelineController = require("../controllers/timelineController");
const md_auth = require("../middlewares/token_middleware");

const prefix = "/timeline";

router.get(`${prefix}`, md_auth.ensureToken, timelineController.getTimeline); // get all stories

router.get(`${prefix}/:id`, md_auth.ensureToken, timelineController.getLine); // get story by id

router.post(`${prefix}/:id`, md_auth.ensureToken, timelineController.editLine); // edit story by id

router.put(`${prefix}`, md_auth.ensureToken, timelineController.setLine); // create a story

module.exports = router;
