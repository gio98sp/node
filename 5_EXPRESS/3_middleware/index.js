const express = require('express')
const app = express()

const port = 3000

function checkAuth(req, res, next) {
  req.authStatus = true

  if (req.authStatus) {
    console.log('Permissão concedida, pode avançar!')
    next()
  } else {
    console.log('Permissão negada!')
  }
}

app.use(checkAuth)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})