const express = require("express");
const router = express.Router({
  strict: true
});
const faqController = require("../controllers/faqController");
const md_auth = require("../middlewares/token_middleware");

const prefix = "/faq";

router.get(`${prefix}`, md_auth.ensureToken, faqController.getFaqs); // get all stories

router.get(`${prefix}/:id`, md_auth.ensureToken, faqController.getFaq); // get story by id

router.post(`${prefix}/:id`, md_auth.ensureToken, faqController.editFaq); // edit story by id

router.put(`${prefix}`, md_auth.ensureToken, faqController.setFaq); // create a story

module.exports = router;
