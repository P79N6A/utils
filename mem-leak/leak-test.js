/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description leak-test
 */

'use strict';

const http = require('http');
const PORT = 1337;

var server = http.createServer((req, res) => {
  for (var i = 0; i < 1000; i++) {
    server.on('request', function leakyfunc() {
    });
  }

  res.end('Hello World\n');
}).listen(PORT, '127.0.0.1');

server.setMaxListeners(0);

console.log(`Server running at http://127.0.0.1:${PORT}/. Process PID: ${process.pid}`);
