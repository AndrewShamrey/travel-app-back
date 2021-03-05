const { Router } = require("express");
const countries = require("./countries");
// const clients = require("./clients");

const api = Router();

api.use("/countries", countries);
// api.use("/clients", clients);

api.all("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = api;
