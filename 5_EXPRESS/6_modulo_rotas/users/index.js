const express = require('express')
const path = require('path')
const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/form', (req, res) => {
  res.sendFile(`${basePath}/form.html`)
})

router.post('/save', (req, res) => {
  const name = req.body.name
  const age = req.body.age
  res.send(`O seu nome é ${name} e sua idade ${age}`)
})

module.exports = router