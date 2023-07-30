import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('ola maycon')
})

server.listen(3333, () => {
  console.log('A Api está rodando...')
})
