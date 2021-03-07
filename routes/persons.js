const { Router } = require("express");

const {
  getPersons,
  getPersonByName,
  createPerson,
  updatePerson,
  deletePerson
} = require('../services/persons');

const { generatePerson } = require('../utils/generatePerson');
const { validateQuery } = require('../utils/validateQuery');

const api = Router();

api.get("/", validateQuery, (req, res) => {
    getPersons(req.query)
    .then(persons => res.json(persons))
    .catch((err) => res.status(500).end("Access failed"));
});

api.get("/:name", (req, res) => {
  const name = req.params.name;
  getPersonByName(name)
    .then(person => res.json(person))
    .catch(err => res.status(404).end("Not found!"));
});

api.post("/", (req, res) => {
  const newPerson = generatePerson(req.body);
  if (newPerson.message) {
    return res.status(400).end(newPerson.message);
  }
  createPerson(newPerson)
    .then(() => res.status(201).end("New person was added!"))
    .catch((err) => res.status(500).end(JSON.stringify(err)));
});

api.put("/:id", (req, res) => {
  const id = req.params.id;
  const newPerson = generatePerson(req.body);
  if (newPerson.message) {
    return res.status(400).end(newPerson.message);
  }
  updatePerson(id, newPerson)
    .then(() => res.status(200).end("Resource updated successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.patch('/:id', (req, res) => {
  const id = req.params.id;
  const { pass, photo, places } = req.body;
  updatePerson(id, { pass, photo, places })
    .then(() => res.status(200).end("Resource updated successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.delete("/:id", (req, res) => {
  const id = req.params.id;
  deletePerson(id)
    .then(() => res.status(200).end("Resource deleted successfully!"))
    .catch((err) => {
      console.log(err);
      res.status(500).end("Access failed")
    });
});

module.exports = api;
