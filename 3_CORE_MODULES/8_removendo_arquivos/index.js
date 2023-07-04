const fs = require('fs')

fs.unlink('arquivo.txt', (err) => {
  if(err) return console.log(err)
  console.log('Arquivo removido!')
})