const express = require("express");
const router = express.Router();
const validateTweetInput = require("../../validation/tweets");
const mongoose = require("mongoose");
const passport = require("passport");
const Tweets = require("../../models/Tweets");
module.exports = router;

router.get("/tweets", (req, res) => {
  Tweets.find()
    .sort({ date: -1 })
    .then((tweets) => res.join(tweets))
    .catch((err) =>
      res.status(404).json({ notweetsfound: " No tweets found" })
    );
});

router.get("/user/:user_id", (req, res) => {
  Tweets.find({ user: req.params.user_id })
    .then((tweets) => res.json(tweets))
    .catch((err) =>
      res.status(404).json({ notweetsfound: "No tweets found for this user" })
    );
});

router.get("/:id", (req, res) => {
  Tweets.findById(req.params.id)
    .then((tweets) => res.json(tweets))
    .catch((err) =>
      res.status(404).json({ notweetfound: "No tweet found with that ID" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTweet = new Tweets({
      text: req.body.text,
      user: req.user.id,
    });

    newTweet.save().then((tweet) => res.json(tweet));
  }
);

module.exports = router;
