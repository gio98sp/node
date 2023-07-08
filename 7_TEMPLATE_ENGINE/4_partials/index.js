const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
  partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/posts', (req, res) => {
  const posts = [
    {
      title: 'Aprender Node.js',
      body: 'test test test',
      category: 'test',
    },
    {
      title: 'Aprender JavaScript',
      body: 'test test test',
      category: 'test',
    },
    {
      title: 'Aprender Python',
      body: 'test test test',
      category: 'test',
    }
  ]
  res.render('posts', { posts })
})

app.listen(3000)