const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('register')
})

app.get('/books', (req, res) => {
  const query = `SELECT * FROM books`
  conn.query(query, (err, data) => {
    if (err) return console.log(err)
    res.render('books', {books: data})
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  conn.query(query, (err, data) => {
    if (err) return console.log(err)
    res.render('book', {book: data[0]})
  })
})

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  conn.query(query, (err, data) => {
    if (err) return console.log(err)
    res.render('edit', {book: data[0]})
  })
})

app.post('/books/edit', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  const query = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

  conn.query(query, (err) => {
    if (err) return console.log(err)
    res.redirect(`/books/${id}`)
  })
})

app.post('/books/insert', (req, res) => {
  const title = req.body.title
  const pageqty = req.body.pageqty

  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

  conn.query(query, (err) => {
    if (err) return console.log(err)
    res.redirect('/books')
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