const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const validate = require('../middleware/validate');

// GET all destinations
router.get('/', destinationController.getAllDestinations);

// GET destination by ID
router.get('/:id', destinationController.getDestinationById);

// POST create destination with validation
router.post('/', validate.destinationValidation, destinationController.createDestination);

// PUT update destination by ID with validation
router.put('/:id', validate.destinationValidation, destinationController.updateDestination);

// DELETE destination by ID
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
