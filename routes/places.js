const { Router } = require("express");

const {
  getPlaces,
  getPlacesByCountry,
  createPlace,
  postAllPlaces,
  updatePlace,
  deletePlace,
  deleteAllPlaces
} = require('../services/places');

const { generateItem } = require('../utils/generateItem');
const { validateQuery } = require('../utils/validateQuery');

const api = Router();

api.get("/", validateQuery, (req, res) => {
  getPlaces(req.query)
    .then(places => res.json(places))
    .catch((err) => res.status(500).end("Access failed"));
});

api.get("/:country", (req, res) => {
  getPlacesByCountry(req)
    .then(place => res.json(place))
    .catch(err => res.status(404).end("Not found!"));
});

api.post("/", (req, res) => {
  const newPlace = generateItem("place", req.body);
  if (newPlace.message) {
    return res.status(400).end(newPlace.message);
  }
  createPlace(newPlace)
    .then(() => res.status(201).end("New place was added!"))
    .catch((err) => res.status(500).end(JSON.stringify(err)));
});

api.post("/all", (req, res) => {
  postAllPlaces(req, res)
    .then(() => res.status(201).end("Places was added!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.put("/:id", (req, res) => {
  const id = req.params.id;
  const newPlace = generateItem("place", req.body);
  if (newPlace.message) {
    return res.status(400).end(newPlace.message);
  }
  updatePlace(id, newPlace)
    .then(() => res.status(200).end("Resource updated successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.patch('/:id', (req, res) => {
  const id = req.params.id;
  const { country, image, rating, personsId, info } = req.body;
  updatePlace(id, { country, image, rating, personsId, info })
    .then(() => res.status(200).end("Resource updated successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.delete("one/:id", (req, res) => {
  const id = req.params.id;
  deletePlace(id)
    .then(() => res.status(200).end("Resource deleted successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.delete("/all", (req, res) => {
  deleteAllPlaces(req)
    .then(() => res.status(200).end("Resource deleted successfully!"))
    .catch((err) => res.status(500).end("Access failed"));     
});

module.exports = api;
