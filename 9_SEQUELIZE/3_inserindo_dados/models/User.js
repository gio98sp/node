const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const sequelize = db.define('User', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  occupation: {
    type: DataTypes.STRING,
    required: true
  },
  newsLetter: {
    type: DataTypes.BOOLEAN
  }
})

module.exports = sequelize