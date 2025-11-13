import http from 'http';
import dotenv from 'dotenv';
import { getAllUsers, getUser, postUser } from './handleRequests';
import { HttpStatus } from './types/types';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  if (!req.url) return;
  res.setHeader('Content-Type', 'application/json');
  const isUrl = req.url === '/api/users' || req.url === '/api/users/';

  if (isUrl && req.method === 'GET') {
    getAllUsers(res);
  } else if (isUrl && req.method === 'POST') {
    postUser(req, res);
  } else if (req.url.startsWith('/api/users/') && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getUser(id, res);
  } else {
    res.writeHead(HttpStatus.NOT_FOUND);
    res.end(JSON.stringify({ message: 'not found' }));
  }
});

server.listen(PORT, () => {
  console.log('all good');
});
