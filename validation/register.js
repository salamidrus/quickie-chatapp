const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  // Convert empty fields to String in order to validate them
  let fields = ["name", "username", "password", "confirmPassword"];
  for (let key of fields) {
    data[key] = !isEmpty(data[key]) ? data[key] : "";

    if (Validator.isEmpty(data[key])) {
      errors[key] = `${key} field is required`;
    }

    if (
      key == "password" &&
      !Validator.isLength(data.password, { min: 6, max: 30 })
    ) {
      errors[key] = `${key} must be at least 6 characters`;

      if (
        key == "confirmPassword" &&
        !Validator.equals(data.password, data.password2)
      ) {
        errors.confirmPassword = "Passowrds must match";
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
