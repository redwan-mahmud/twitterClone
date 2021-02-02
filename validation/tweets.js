const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTweetInput(data) {
  let errors = {};

  data.tweet = validText(data.tweet) ? data.tweet : "";

  if (!Validator.isLength(data.tweet, { min: 4, max: 140 })) {
    errors.handle = "Tweet must be between 4 and 140 characters";
  }

  if (Validator.isEmpty(data.tweet)) {
    errors.handle = "Tweet field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
