const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require('./models/User')

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/:id', async (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsLetter = req.body.newsLetter

  newsLetter === 'on' ? newsLetter = true : newsLetter = false

  const userData = {name, occupation, newsLetter}

  await User.update(userData, { where: { id: id }})
  
  res.redirect('/')
})

app.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findOne({ raw: true, where: { id: id } })
  res.render('user', { user })
})

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true })
  res.render('home', { users })
});

conn
  .sync()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
