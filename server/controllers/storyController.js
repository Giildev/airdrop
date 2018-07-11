const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const modelStory = require("../models/story");
const config = require("../libs/config")

getStories = (req, res) => {
    modelStory.find({}, (err, stories) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get all stories` })

    res.status(200).send({ success: true, data: stories })
  })
};

getStory = (req, res) => {
  let id = req.params.id;

  modelStory.findById(id, (err, stories) => {
    if(err) return res.status(500).send({ success: false, msg: `Problem to get Story` })

    res.status(200).send({ success: true, data: stories })
  })
};

setStory = (req, res) => {
  const { title, subtitle, cover, content } = req.body;
  const Story = new modelStory();

  if ( title && subtitle && cover && content ) {

    Story.title = title;
    Story.subtitle = subtitle;
    Story.cover = cover;
    Story.content = content;

    // Check for duplicates
    modelStory.find({ title: Story.title }, (err, stories) => {
      if(err) return res.status(500).send({ success: false, msg: 'Error getting stories to compare'});

      // if exist 1 or more stories story already posted and break statement
      if(stories && stories.length >= 1) return res.status(200).send({ success: false, msg: 'Story already posted'});

      // Save Story into DB
      Story.save((error, storyStored) => {
        if (error) return res.status(500).send({
          success: false,
          msg: `Error saving story`
        });

        if (storyStored) {
          res.status(200).send({
            success: true,
            msg: `Registered story succesfully`,
            data: storyStored
          })
        } else {
          res.status(404).send({
            success: false,
            msg: `Can't save story`
          })
        }
      })
    })

  } else {
    res.status(200).send({
      success: false,
      msg: `Don't leave empty fields`
    })
  }
};

editStory = (req, res) => {
  let body = req.body;
  let ids = req.params.id.split(",");

  let newDate = new Date();
  if (body.hasOwnProperty("deleted")) {
    body.deletedAt = newDate;
  } else {
    body.updatedAt = newDate;
  }

  for (const i in ids) {
    modelStory.findByIdAndUpdate(
      ids[i],
      body,
      { new: true },
      (err, donation) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ success: false, msg: "Problem Editing Donation" });
        }
      }
    );
  }

  res.status(200).send({
    success: true,
    code: 200,
    msg: "All stories modified successfully"
  })
};

module.exports = {
  setStory,
  getStories,
  getStory,
  editStory
};