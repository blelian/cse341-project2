const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true }
});

module.exports = mongoose.model('Destination', destinationSchema);
