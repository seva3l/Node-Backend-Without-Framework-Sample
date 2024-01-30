import * as http from 'http';
import { handleApiRequest } from './controllers';

const server = http.createServer((req, res) => {
  if (req.url === '/api/nobel' && req.method === 'POST') {
    handleApiRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
