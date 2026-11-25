// LU 2.3 only: runs the SAME /health route without starting PostgreSQL.
// This is a liveness preview, NOT the full reference application.
const http = require('node:http');
const { handle } = require('../src/routes');
const server = http.createServer((req, res) => {
  if (req.url !== '/health') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Preview supports only /health' }));
  }
  return handle(req, res);
});
server.on('error', (err) => {
  console.error(`Preview failed: ${err.code}. Port 3000 may already be in use.`);
  process.exit(1);
});
server.listen(3000, '127.0.0.1', () => console.log('Liveness preview: http://localhost:3000/health'));
