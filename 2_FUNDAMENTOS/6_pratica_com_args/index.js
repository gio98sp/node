const minimist = require('minimist')
const sum = require('./modulo').sum

const args = minimist(process.argv)

const number1 = args['number1']

const number2 = args['number2']

sum(number1, number2)