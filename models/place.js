const { Schema, model } = require('mongoose');

const placeSchema = new Schema({
  country: { type: String, required: true },
  images: { type: Array, default: [] },
  rating: { type: Number, default: 0 },
  personsId: { type: Array, default: [] },
  info: { type: Schema.Types.Mixed, required: true },
  _deletedAt: { type: Date, default: null, select: false },
});

module.exports = model('place', placeSchema);
