const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require("./models/User");
const Adress = require("./models/Adress");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/users/create", async (req, res) => {
  try {
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    await Adress.create({ street, number, city });
    res.redirect("/users");
  } catch (err) {
    console.log(err);
  }
});

app.post("/users/create", async (req, res) => {
  try {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsLetter = req.body.newsLetter;
    newsLetter === "on" ? (newsLetter = true) : (newsLetter = false);
    await User.create({ name, occupation, newsLetter });
    res.redirect("/users");
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ include: Adress });
    res.render("users", { users: users.get({plain: true}) });
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.get("/", (req, res) => {
  res.render("home");
});

conn
  .sync()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
