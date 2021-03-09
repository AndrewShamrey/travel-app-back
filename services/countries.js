const Country = require('../models/country');
const { generateItem } = require('../utils/generateItem');

exports.getCountries = async function (query) {
  const page = +query.page;
  let limit = +query.limit;
  if (page && !limit) {
    limit = 5;
  }
  const skip = limit * (page - 1);
  let allCountries = [];
  const cursor = Country.find({ _deletedAt: null }).skip(skip).limit(limit).cursor();
  for (let doc = await cursor.next(); ; doc = await cursor.next()) {
    if (doc == null) {
      return allCountries;
    }
    allCountries.push(doc);
  }
}

exports.getCountryByName = async function (name) {
  const currentCountry = await Country.find({ shortName: name, _deletedAt: null });
  return currentCountry;
}

exports.createCountry = async function (body = {}) {
  const country = new Country(body);
  return country.save();
}

exports.postAllCountries = async function (req, res) {
  const allCountries = req.body;
  return await allCountries.forEach(country => {
    const newCountry = generateItem("country", country);
    if (newCountry.message) {
      return res.status(400).end(`In country '${country.name}' - ${newCountry.message}`);
    }
    exports.createCountry(newCountry);
  });
};

exports.updateCountry = async function (id, body) {
  const newObject = Object.keys(body).reduce((R, k) => {
    if (body[k] !== undefined) {
      R[k] = body[k];
    }
    return R;
  }, {});
  return await Country.updateOne({ _id: id }, newObject);
}

exports.deleteCountry = async function (id) {
  return await exports.updateCountry(id, { _deletedAt: Date.now() });
};

exports.deleteAllCountries = async function (req) {
  // return await Country.deleteMany({});
  const allCountries = exports.getCountries(req);
  (await allCountries).map(item => item._id).forEach(item => {
    exports.updateCountry(item, { _deletedAt: Date.now() });
  });
};
