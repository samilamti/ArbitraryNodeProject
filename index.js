const http = require('http');
const routeConfig = require('./routeConfig');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  routeConfig.handle(server, req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});