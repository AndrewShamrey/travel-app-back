const { Router } = require("express");
const countries = require("./countries");
const persons = require("./persons");

const api = Router();

api.use("/countries", countries);
api.use("/persons", persons);

api.all("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = api;
