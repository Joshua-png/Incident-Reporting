const { body, validationResult } = require("express-validator");
const { BadRequestError } = require("../errors/CustomErrors.js");

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg); //error.msg
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateIncident = withValidationErrors([
  body("incident_desc")
    .trim()
    .notEmpty()
    .withMessage("Please provide an incident description"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("Please provide a name of a city in the country mentioned"),
  body("country")
    .trim()
    .notEmpty()
    .withMessage("Please provide a name of a country"),
]);

export const validateSearch = withValidationErrors([
  body("country")
    .trim()
    .notEmpty()
    .withMessage("Please provide a name of a country"),
]);
