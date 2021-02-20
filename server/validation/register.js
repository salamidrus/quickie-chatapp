const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  // Convert empty fields to String in order to validate them
  let fields = ["name", "username", "password", "confirmPassword"];
  for (let key of fields) {
    data[key] = !isEmpty(data[key]) ? data[key] : "";

    if (Validator.isEmpty(data[key])) {
      errors[key] = `${key} is required`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
