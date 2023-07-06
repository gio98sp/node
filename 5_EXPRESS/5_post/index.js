const express = require('express')
const path = require('path')
const app = express()

const port = 3000

const basePath = path.join(__dirname, 'templates')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.get('/form.html', (req, res) => {
  res.sendFile(`${basePath}/form.html`)
})

app.post('/users/save', (req, res) => {
  const name = req.body.name
  const age = req.body.age

  res.send(`Seu nome é ${name} e sua idade é ${age}`)
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})