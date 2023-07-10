const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const query = `SELECT * FROM books`

  conn.query(query, (err, data) => {
    if (err) return console.log(err)
    res.render('books', {books: data})
  })
})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id

  const query = `DELETE FROM books WHERE id = ${id}`

  conn.query(query, (err) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})

conn.connect((err) => {
  if (err) return console.log(err)
  app.listen(3000)
})