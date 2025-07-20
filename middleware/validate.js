// middleware/validate.js

function countryValidation(req, res, next) {
  const { name, population, continent } = req.body;

  if (
    !name || typeof name !== 'string' ||
    !continent || typeof continent !== 'string'
  ) {
    return res.status(400).json({
      message: 'Invalid country data. Name and continent are required and must be strings.'
    });
  }

  if (population !== undefined && typeof population !== 'number') {
    return res.status(400).json({ message: 'Population must be a number if provided.' });
  }

  next();
}

function destinationValidation(req, res, next) {
  const { countryId, name, description, attractionType, bestTimeToVisit } = req.body;

  if (
    !countryId || typeof countryId !== 'string' ||
    !name || typeof name !== 'string' ||
    !description || typeof description !== 'string' ||
    !attractionType || typeof attractionType !== 'string' ||
    !bestTimeToVisit || typeof bestTimeToVisit !== 'string'
  ) {
    return res.status(400).json({
      message: 'Invalid destination data. Required fields must be strings.'
    });
  }

  next();
}

module.exports = { countryValidation, destinationValidation };
