const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  shortName: { type: String, required: true },
  timeDifference: { type: Number, required: true },
  info: { type: Schema.Types.Mixed, required: true }, 
  _deletedAt: { type: Date, default: null, select: false },
});

module.exports = model('country', countrySchema);
