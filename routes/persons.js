const { Router } = require("express");

const {
  getPersons,
  getPersonByName,
  getPersonWithoutPhoto,
  getPersonByPass,
  createPerson,
  updatePerson,
  deletePerson
} = require('../services/persons');

const { generateItem } = require('../utils/generateItem');
const { validateQuery } = require('../utils/validateQuery');
const { validatePass } = require('../utils/validatePass');

const api = Router();

api.get("/", validateQuery, (req, res) => {
  getPersons(req.query)
    .then(persons => res.json(persons))
    .catch((err) => res.status(500).end("Access failed"));
});

api.get("/withoutPhoto/", validateQuery, (req, res) => {
  getPersonWithoutPhoto(req.query)
    .then(person => res.json(person))
    .catch(err => res.status(404).end("Not found!"));
});

api.get("/full/:name", (req, res) => {
  const name = req.params.name;
  getPersonByName(name)
    .then(person => res.json(person))
    .catch(err => res.status(404).end("Not found!"));
});

api.get("/one/:name/:pass", (req, res) => {
  const name = req.params.name;
  const pass = req.params.pass;
  getPersonByPass(name, pass)
    .then(person => res.json(person))
    .catch(err => res.status(404).end("Not found!"));
});

api.post("/", (req, res) => {
  const newPerson = generateItem("person", req.body);
  if (newPerson.message) {
    return res.status(400).end(newPerson.message);
  }
  createPerson(newPerson)
    .then(() => res.status(201).end("New person was added!"))
    .catch((err) => res.status(400).end(JSON.stringify(err)));
});

api.put("/:id", (req, res) => {
  const id = req.params.id;
  const newPerson = generateItem("person", req.body);
  if (newPerson.message) {
    return res.status(400).end(newPerson.message);
  }
  const validatedPerson = validatePass(newPerson);
  if (validatedPerson.message) {
    return res.status(400).end(newPerson.message);
  }
  const { pass, photo } = validatedPerson;
  const { nickname } = newPerson;
  updatePerson(id, { nickname, pass, photo })
    .then(() => res.status(200).end("Resource updated successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.patch('/:id', (req, res) => {
  const id = req.params.id;
  const newObject = { pass, photo } = req.body;
  const validatedPerson = validatePass(newObject);
  if (validatedPerson.message) {
    return res.status(400).end(validatedPerson.message);
  }
  updatePerson(id, validatedPerson)
    .then(() => res.status(200).end("Resource updated successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

api.delete("/:id", (req, res) => {
  const id = req.params.id;
  deletePerson(id)
    .then(() => res.status(200).end("Resource deleted successfully!"))
    .catch((err) => res.status(500).end("Access failed"));
});

module.exports = api;
