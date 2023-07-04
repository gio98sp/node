const fs = require('fs')

if (fs.existsSync('./pasta')) {
  console.log('Existe!')
} else {
  console.log('Não existe!')
  fs.mkdirSync('./pasta')
}