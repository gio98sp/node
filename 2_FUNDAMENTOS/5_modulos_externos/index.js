const minimist = require('minimist')

const args = minimist(process.argv)

const name = args['name']

const professional = args['professional']

console.log(`Meu nome é ${name} e minha profissão é: ${professional}`.replace('_', ' '))