const { Router } = require("express");

const {
  getCountries,
  getCountriesByLang,
  getCountryByNameWithLang,
  createCountry,
  postAllCountries,
  updateCountry,
  deleteCountry,
  deleteAllCountries
} = require('../services');

const { generateCountry } = require('../utils/generateCountry');
const { validateQuery } = require('../utils/validateQuery');

const api = Router();

api.get("/", validateQuery, (req, res) => {
  getCountries(req.query)
    .then(countries => res.json(countries))
    .catch((err) => res.status(500).end("Access failed"));
});

api.get("/:lang", validateQuery, (req, res) => {
  getCountriesByLang(req)
    .then(countries => res.json(countries))
    .catch((err) => res.status(500).end("Access failed"));
});

api.get("/:lang/:name", (req, res) => {
  const lang = req.params.lang;
  const name = req.params.name;
  getCountryByNameWithLang(lang, name)
    .then(country => res.json(country))
    .catch(err => res.status(404).end("Not found!"));
});

api.post("/", (req, res) => {
  const newCountry = generateCountry(req.body);
  if (newCountry.message) {
    return res.status(400).end(newCountry.message);
  }
  createCountry(newCountry)
    .then(() => res.status(201).end("New country was added!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.post("/all", (req, res) => {
  postAllCountries(req, res)
    .then(() => res.status(201).end("Countries was added!"))
    .catch((err) => {
      console.log(err);
      res.status(500).end("Access failed")
    });
});

api.put("/:id", (req, res) => {
  const id = req.params.id;
  const newCountry = generateCountry(req.body);
  if (newCountry.message) {
    return res.status(400).end(newCountry.message);
  }
  updateCountry(id, newCountry)
    .then(() => res.status(200).end("Resource updated successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.delete("/one/:id", (req, res) => {
  const id = req.params.id;
  deleteCountry(id)
    .then(() => res.status(200).end("Resource deleted successfully!"))
    .catch((err) => res.status(500).end("Access failed"));     
});

api.delete("/all", (req, res) => {
  deleteAllCountries(req)
    .then(() => res.status(200).end("Resource deleted successfully!"))
    .catch((err) => res.status(500).end("Access failed"));     
});

module.exports = api;
