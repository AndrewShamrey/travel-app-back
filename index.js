require("dotenv").config();

const mongoose = require('mongoose');
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const { port, mongo_connection } = require('./config');

const app = express();
const PORT = process.env.PORT || port || 3001;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan("short"));
app.use(cors());

const api = require("./routes/api");

app.use("/api", api);

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

const connectionPath = process.env.MONGO_CONNECTION || mongo_connection;
mongoose.connect(connectionPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
