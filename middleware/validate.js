// middleware/validate.js

function countryValidation(req, res, next) {
  const { name, capital, population, language, currency, continent, description } = req.body;

  if (
    !name || typeof name !== 'string' ||
    !capital || typeof capital !== 'string' ||
    !continent || typeof continent !== 'string' ||
    !language || typeof language !== 'string' ||
    !currency || typeof currency !== 'string' ||
    !description || typeof description !== 'string'
  ) {
    return res.status(400).json({
      message: 'Invalid country data. All fields except population are required and must be strings.'
    });
  }

  if (population !== undefined && typeof population !== 'number') {
    return res.status(400).json({ message: 'Population must be a number if provided.' });
  }

  next();
}

function destinationValidation(req, res, next) {
  const { countryId, name, description, attractionType, entryFee, bestTimeToVisit, rating } = req.body;

  if (
    !countryId || typeof countryId !== 'string' ||
    !name || typeof name !== 'string' ||
    !description || typeof description !== 'string' ||
    !attractionType || typeof attractionType !== 'string' ||
    !bestTimeToVisit || typeof bestTimeToVisit !== 'string' 
  ) {
    return res.status(400).json({
      message: 'Invalid destination data. All fields except entryFee and rating are required and must be strings.'
    });
  }

  if (entryFee !== undefined && typeof entryFee !== 'number') {
    return res.status(400).json({ message: 'Entry fee must be a number if provided.' });
  }

  if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
    return res.status(400).json({ message: 'Rating must be a number between 0 and 5 if provided.' });
  }

  next();
}

module.exports = { countryValidation, destinationValidation };
