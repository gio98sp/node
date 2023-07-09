const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})

conn.connect((err) => {
  if(err) console.log(err)
  console.log('Connected')
  app.listen(3000)
})