

let http = require('http')
let fs = require('fs')

let server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-type': 'text/html;charset=UTF-8' })
  // if (request.url === '/a') {
  //   fs.readFile('./a.html', (err, data) => {
  //     response.end(data)
  //   })
  // } else if (request.url === '/b') {
  //   fs.readFile('./b.html', (err, data) => {
  //     response.end(data)
  //   })
  // }
  console.log(request.url)
  response.end(request.url)
})
server.listen(5200, '127.0.0.1')