const Country = require('../models/country');
const { generateCountry } = require('../utils/generateCountry');

exports.getCountries = async function (query) {
  const page = +query.page;
  let limit = +query.limit;
  if (page && !limit) {
    limit = 5;
  }
  const skip = limit * (page - 1);
  let allCountries = [];
  const cursor = Country.find({ _deletedAt: null }).select('_id lang name shortName body').skip(skip).limit(limit).cursor();
  for (let doc = await cursor.next(); ; doc = await cursor.next()) {
    if (doc == null) {
      return allCountries;
    }
    allCountries.push(doc);
  }
}

exports.getCountriesByLang = async function (req) {
  const lang = req.params.lang;
  const query = req.query;
  const page = +query.page;
  let limit = +query.limit;
  if (page && !limit) {
    limit = 5;
  }
  const skip = limit * (page - 1);
  let allCountries = [];
  const cursor = Country.find({ lang: lang, _deletedAt: null }).select('_id lang name shortName body').skip(skip).limit(limit).cursor();
  for (let doc = await cursor.next(); ; doc = await cursor.next()) {
    if (doc == null) {
      return allCountries;
    }
    allCountries.push(doc);
  }
}

exports.getCountryByNameWithLang = async function (lang, name) {
  const currentCountry = await Country.find({ lang: lang, shortName: name, _deletedAt: null }).select('_id lang name shortName body');
  return currentCountry;
}

exports.createCountry = async function ({ name, shortName, lang, body } = {}) {
  const country = new Country({ name, shortName, lang, body });
  return country.save();
}

exports.postAllCountries = async function (req, res) {
  const allCountries = req.body;
  return await allCountries.forEach(country => {
    const newCountry = generateCountry(country);
    if (newCountry.message) {
      return res.status(400).end(`In country '${country.name}' - ${newCountry.message}`);
    }
    exports.createCountry(newCountry);
  });
};

exports.updateCountry = async function (id, { name, shortName, lang, body, _deletedAt }) {
  const valuesToUpdate = { name, shortName, lang, body, _deletedAt };
  const newObject = Object.keys(valuesToUpdate).reduce((R, k) => {
    if (valuesToUpdate[k] !== undefined) {
      R[k] = valuesToUpdate[k];
    }
    return R;
  }, {});
  return await Country.updateOne({ _id: id }, newObject);
}

exports.deleteCountry = async function (id) {
  return await exports.updateCountry(id, { _deletedAt: Date.now() });
};

exports.deleteAllCountries = async function (req) {
  const allCountries = exports.getCountries(req);
  (await allCountries).map(item => item._id).forEach(item => {
    exports.updateCountry(item, { _deletedAt: Date.now() });
  });
};
