const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  const urlServer = require('url').parse(req.url, true)
  const name = urlServer.query.name

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  if (name) {
    res.end(`<h1>Seja bem vindo! ${name}</h1>`)
  } else {
    res.end('<h1>Preencha o seu nome:</h1><form method="GET"><input type="text" name="name"><button type="submit" value="enviar">Enviar</button></form>')
  }
})

server.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`)
  console.log(`Acesse: http://localhost:${port}`)
})