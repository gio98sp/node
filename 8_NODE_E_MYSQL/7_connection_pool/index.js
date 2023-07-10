const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const query = 'SELECT * FROM books'

  pool.query(query, (err, data) => {
    if (err) return console.log(err)
    res.render('books', {books: data})
  })
})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id

  const query = `DELETE FROM books WHERE id = ${id}`

  pool.query(query, (err) => {
    if (err) return console.log
    res.redirect('/')
  })
})

app.listen(3000)