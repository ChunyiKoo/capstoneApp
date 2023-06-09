// backend/utils/validation.js
const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
 const validationErrors = validationResult(req);
 console.log("1111111 validationErrors", validationErrors);
 if (!validationErrors.isEmpty()) {
  const errors = {};
  validationErrors.array().forEach((error) => (errors[error.path] = error.msg));

  console.log(errors);

  const err = Error("Bad request.");
  err.errors = errors;
  err.status = 400;
  err.title = "Bad request.";
  next(err);
 }
 next();
};

module.exports = {
 handleValidationErrors,
};
