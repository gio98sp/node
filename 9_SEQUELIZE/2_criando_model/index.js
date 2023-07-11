const express = require("express");
const conn = require("./db/conn");
const User = require("./models/User");

const app = express();

app.get("/", (req, res) => {
  res.write("hello world");
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
