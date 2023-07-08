const express = require('express')
const path = require('path')
const users = require('./users')

const app = express()
const port = 5000

const basePath = path.join(__dirname, 'templates')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('./public'))

app.use('/users', users)

app.get('/', (req, res) => {
  res.status(200)
  res.sendFile(`${basePath}/index.html`)
})

app.use((req, res) => {
  res.status(404)
  res.sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})