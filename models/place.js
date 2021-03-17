const { Schema, model } = require('mongoose');

const placeSchema = new Schema({
  country: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Schema.Types.Mixed, required: true },
  personsId: { type: Array, default: [] },
  info: { type: Schema.Types.Mixed, required: true },
  _deletedAt: { type: Date, default: null, select: false },
});

module.exports = model('place', placeSchema);
