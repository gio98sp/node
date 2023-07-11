const express = require('express')
const conn = require('./db/conn')

const app = express()

app.get('/', (req, res) => {
  res.write('hello world!')
})

app.listen(3000)