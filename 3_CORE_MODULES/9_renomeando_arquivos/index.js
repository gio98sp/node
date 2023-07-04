const fs = require('fs')

fs.rename('arquivo.txt', 'novoArquivo.txt', (err) => {
  if (err) return console.log(err)
  console.log('Arquivo renomeado com sucesso!')
})