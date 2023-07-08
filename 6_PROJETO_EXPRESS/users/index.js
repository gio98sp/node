const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/form', (req, res) => {
  res.status(200)
  res.sendFile(`${basePath}/form.html`)
})

router.post('/save', (req, res) => {
  res.status(200)
  const name = req.body.name
  res.send(`Seu nome é ${name}`)
})

module.exports = router