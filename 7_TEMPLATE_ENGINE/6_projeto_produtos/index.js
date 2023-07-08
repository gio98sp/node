const express = require('express')
const exphbs = require('express-handlebars')
const products = require('./products')

const app = express()

const hbs = exphbs.create({
  partialsDir: 'views/partials'
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/products', products)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000)