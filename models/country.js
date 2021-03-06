const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  name:  { type: String, required: true },
  shortName:  { type: String, required: true },
  lang: { type: String, required: true },
  capital: { type: String, required: true },
  timeDifference: { type: Number, required: true },
  description: { type: String, required: true },
  // body: Schema.Types.Mixed,
  _deletedAt: { type: Date, default: null, select: false },
});

module.exports = model('country', countrySchema);
