const { body, validationResult } = require('express-validator');

// Validation rules for destinations
const destinationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('country_id').notEmpty().withMessage('Country ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation rules for countries
const countryValidation = [
  body('name').notEmpty().withMessage('Country name is required'),
  body('code').notEmpty().withMessage('Country code is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  destinationValidation,
  countryValidation
};
