const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const validate = require('../middleware/validate');
const isLoggedIn = require('../middleware/isLoggedIn');  // Authentication middleware

// Public Routes
router.get('/', countryController.getAllCountries); // Get all countries
router.get('/:id', countryController.getCountryById); // Get country by ID

// Protected Routes — Require Login
// 🔐 Protected: Create country
router.post('/', isLoggedIn, validate.countryValidation, countryController.createCountry);

// 🔐 Protected: Update country by ID
router.put('/:id', isLoggedIn, validate.countryValidation, countryController.updateCountry);

// 🔐 Protected: Delete country by ID
router.delete('/:id', isLoggedIn, countryController.deleteCountry);

module.exports = router;
