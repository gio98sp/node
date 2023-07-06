const express = require('express')
const app = express()

const port = 3000

app.get('/users/:id', (req, res) => {
  const id = req.params.id

  res.send(`Usuario de id: ${id}`)
})

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})