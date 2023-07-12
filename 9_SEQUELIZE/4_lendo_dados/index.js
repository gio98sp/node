const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require("./models/user")

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true })
  res.render('home', { users })
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
