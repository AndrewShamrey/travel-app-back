const Place = require('../models/place');

exports.getPlaces = async function (query) {
  const page = +query.page;
  let limit = +query.limit;
  if (page && !limit) {
    limit = 5;
  }
  const skip = limit * (page - 1);
  let allPlaces = [];
  const cursor = Place.find({  _deletedAt: null }).skip(skip).limit(limit).cursor();
  for (let doc = await cursor.next(); ; doc = await cursor.next()) {
    if (doc == null) {
      return allPlaces;
    }
    allPlaces.push(doc);
  }
}

exports.getPlacesByCountry = async function (req) {
  const country = req.params.country;
  const query = req.query;
  const page = +query.page;
  let limit = +query.limit;
  if (page && !limit) {
    limit = 5;
  }
  const skip = limit * (page - 1);
  let allPlaces = [];
  const cursor = Place.find({ country: country, _deletedAt: null }).skip(skip).limit(limit).cursor();
  for (let doc = await cursor.next(); ; doc = await cursor.next()) {
    if (doc == null) {
      return allPlaces;
    }
    allPlaces.push(doc);
  }
}

exports.createPlace = async function (body = {}) {
  const place = new Place(body);
  return place.save();
}

exports.postAllPlaces = async function (req, res) {
  const allPlaces = req.body;
  return await allPlaces.forEach(place => {
    const newPlace = generateItem("place", place);
    if (newPlace.message) {
      return res.status(400).end(`In country '${place.name}' - ${newPlace.message}`);
    }
    exports.createPlace(newPlace);
  });
};

exports.updatePlace = async function (id, body) {
  const newObject = Object.keys(body).reduce((R, k) => {
    if (body[k] !== undefined) {
      R[k] = body[k];
    }
    return R;
  }, {});
  return await Place.updateOne({ _id: id }, newObject);
}

exports.deletePlace = async function (id) {
  return await exports.updatePlace(id, { _deletedAt: Date.now() });
};

exports.deleteAllPlaces = async function (req) {
  // return await Place.deleteMany({});
  const allPlaces = exports.getPlaces(req);
  (await allPlaces).map(item => item._id).forEach(item => {
    exports.updatePlace(item, { _deletedAt: Date.now() });
  });
};
