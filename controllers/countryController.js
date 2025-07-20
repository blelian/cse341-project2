const Country = require('../models/country');

async function getAllCountries(req, res, next) {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
}

async function getCountryById(req, res, next) {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json(country);
  } catch (error) {
    next(error);
  }
}

async function createCountry(req, res, next) {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    next(error);
  }
}

async function updateCountry(req, res, next) {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json(country);
  } catch (error) {
    next(error);
  }
}

async function deleteCountry(req, res, next) {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
};
