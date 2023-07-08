const express = require('express')
const routes = express.Router()

const products = [
  {
    id: 1,
    title: 'Caneta',
    price: 5.50,
    category: 'Escolar'
  },
  {
    id: 2,
    title: 'Tênis',
    price: 99.90,
    category: 'Calçados'
  },
  {
    id: 3,
    title: 'Mouse',
    price: 29.90,
    category: 'Computador'
  }
]

routes.get('/', (req, res) => {
  res.render('products', {products})
})

routes.get('/:id', (req, res) => {
  const id = req.params.id
  const product = products[id -1]
  res.render('product', {product})
})

module.exports = routes