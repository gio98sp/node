const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true)
  const name = urlInfo.query.name

  if (name) {
    fs.writeFile('arquivo.txt', name, (err, data) => {
      res.writeHead(302, {
        Location: '/'
      })
      res.end()
    })
  } else {
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    })
  }
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
  console.log(`Acesse: http://localhost:${port}`)
})