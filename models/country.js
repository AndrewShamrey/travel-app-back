const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  shortName: { type: String, required: true },
  timeDifference: { type: Number, required: true },
  latlng: { type: Array, required: true },
  iso3166: { type: String, required: true },
  capitalCoord : { type: Array, required: true },
  currency: { type: Schema.Types.Mixed, required: true },
  mainPlace: { type: Schema.Types.Mixed, required: true },
  video: { type: String, required: true },
  info: { type: Schema.Types.Mixed, required: true }, 
  _deletedAt: { type: Date, default: null, select: false },
});

module.exports = model('country', countrySchema);
