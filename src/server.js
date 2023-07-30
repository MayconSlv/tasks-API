import http from 'node:http'
import {routes } from './routes.js'


const server = http.createServer((req, res) => {
  const { method, url } = req
  
  const route = routes.find((route) => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }

  console.log(route)

  // return res.writeHead(404).end()

  return res.end('ola')
})

server.listen(3333, () => {
  console.log('A Api está rodando...')
})
