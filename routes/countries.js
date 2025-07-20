const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const validate = require('../middleware/validate');

// GET all countries
router.get('/', countryController.getAllCountries);

// GET country by ID
router.get('/:id', countryController.getCountryById);

// POST create country with validation
router.post('/', validate.countryValidation, countryController.createCountry);

// PUT update country by ID with validation
router.put('/:id', validate.countryValidation, countryController.updateCountry);

// DELETE country by ID
router.delete('/:id', countryController.deleteCountry);

module.exports = router;
