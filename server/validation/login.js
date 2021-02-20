const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  // Convert empty fields to String in order to validate them
  let fields = ["username", "password"];
  for (let key of fields) {
    data[key] = !isEmpty(data[key]) ? data[key] : "";

    if (Validator.isEmpty(data[key])) {
      errors[key] = `${key} field is required`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
