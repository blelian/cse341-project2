const { body, validationResult } = require('express-validator');

// Common error handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for destinations (unchanged)
const destinationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('country_id').notEmpty().withMessage('Country ID is required'),
  handleValidation
];

// Validation for both creating and updating countries (only name required)
const countryValidation = [
  body('name').notEmpty().withMessage('Country name is required'),
  body('code').optional().isString().withMessage('Code must be a string'),
  body('continent').optional().isString().withMessage('Continent must be a string'),
  body('population').optional().isNumeric().withMessage('Population must be a number'),
  handleValidation
];

module.exports = {
  destinationValidation,
  countryValidation
};
