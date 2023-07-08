const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const auth = true
  res.render('home', {auth})
})

app.get('/dashboard', (req, res) => {
  const user = {
    name: 'Giovane',
    age: 25
  }
  res.render('dashboard', {user})
})

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprendendo Node.js',
    category: 'Javascript',
    body: 'Aprendendo Node.js, express, handlebars e muito mais!',
    comments: 4
  }
  res.render('post', {post})
})

app.listen(3000)