const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require("./models/User");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.post("/users/register", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsLetter = req.body.newsLetter;

  newsLetter === "on" ? (newsLetter = true) : (newsLetter = false);

  await User.create({ name, occupation, newsLetter });

  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("home");
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
