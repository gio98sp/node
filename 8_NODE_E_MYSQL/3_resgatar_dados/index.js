const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/form', (req, res) => {
  res.render('form')
})

app.post('/books/insert', (req, res) => {
  const title = req.body.title
  const pageqty = req.body.pageqty

  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

  conn.query(query, (err) => {
    if (err) console.log(err)
    res.redirect('/books')
  })
})

app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books'

  conn.query(query, (err, books) => {
    if (err) console.log(err)
    res.render('books', {books})
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
  console.log('Connected')
  app.listen(3000)
})