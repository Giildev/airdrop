const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelFaq = require("../models/faq");
const modelSite = require("../models/site");
const config = require("../libs/config")

getFaqs = (req, res) => {
  modelFaq.find({}).exec((err, faqs) => {
    if (err) return res.status(500).send({
      success: false,
      msg: `Problem to get all faqs`
    })

    res.status(200).send({
      success: true,
      faqs: faqs
    })
  })
};

getFaq = () => {
  let id = req.params.id;

  modelFaq.find({ _id: id }, (err, faqs) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get donation` })

    res.status(200).send({ success: true, data: faqs })
  })
}

setFaq = (req, res) => {
  let { question, answer } = req.body;
  const Faq = new modelFaq();

  if(question && answer && lan){

    Faq.question = question;
    Faq.answer = answer;
    Faq.site = '5b479f121f22d372dfb0f433'; // se envia desde el front

    modelFaq.find({ question: Faq.question, deleted: false }, (err, faqs) => {
      if(err) return res.status(500).send({ success: false, msg: 'Error getting faqs to compare'})

      if (faqs && faqs.length >= 1) return res.status(200).send({
        success: false,
        msg: 'faq already posted'
      })

      Faq.save((error, faqStored) => {
        if(error) return res.status(500).send({ success: false, msg: error }) 

        if (faqStored) {
          modelSite.update(
            { _id: '5b479f121f22d372dfb0f433' }, // se envia desde el front
            { $push: { faqs: faqStored._id } },
            (err, faqUpdated) => {
              if (err) return res.status(500).send({
                success: false,
                msg: `Error saving faq`
              });

              res.status(200).send({
                success: true,
                msg: `Registered faq succesfully`,
                data: faqStored
              })
            }
          )
        } else {
          res.status(404).send({
            success: false,
            msg: `Can't save faq`
          })
        }
      })
    })

  }else {
    res.status(200).send({
      success: false,
      msg: `Don't leave empty fields`
    })
  }
};

editFaq = (req, res) => {
  let body = req.body;
  let ids = req.params.id.split(',');

  let modifiedData = [];

  let newDate = new Date();
  if (body.hasOwnProperty("deleted")) {
    body.deletedAt = newDate;
  } else {
    body.updatedAt = newDate;
  }

  for (const i in ids) {
    modelFaq.findByIdAndUpdate(
      ids[i],
      body, {
        new: true
      },
      (err, faqUpdated) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({
              success: false,
              msg: "Problem Editing faqs"
            });
        }

        modifiedData.push(faqUpdated);
      }
    );
  }
  
  res.status(200).send({
    success: true,
    msg: "All faqs modified successfully",
    data: faqUpdated
  })
};

module.exports = {
  getFaqs,
  getFaq,
  setFaq,
  editFaq
};