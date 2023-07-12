const express = require("express");
const conn = require("./db/conn");
const User = require('./models/User')
const Adress = require('./models/Adress')

const app = express();

conn
  .sync({ force: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
