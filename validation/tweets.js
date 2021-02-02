const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTweetInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 4, max: 140 })) {
    errors.tweet = "Tweet must be between 4 and 140 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.tweet = "Tweet field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
