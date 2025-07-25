const Destination = require('../models/destination');

async function getAllDestinations(req, res, next) {
  try {
    const destinations = await Destination.find().populate('country_id');
    res.status(200).json(destinations);
  } catch (error) {
    next(error);
  }
}

async function getDestinationById(req, res, next) {
  try {
    const destination = await Destination.findById(req.params.id).populate('country_id');
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
}

async function createDestination(req, res, next) {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    next(error);
  }
}

async function updateDestination(req, res, next) {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
}

async function deleteDestination(req, res, next) {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};
