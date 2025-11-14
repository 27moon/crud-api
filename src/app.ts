import http from 'http';
import dotenv from 'dotenv';
import {
  deleteUser,
  getAllUsers,
  getUser,
  postUser,
  updateUserInfo,
} from './handleRequests';
import { HttpStatus } from './types/types';

dotenv.config();

const PORT = process.env.PORT || 4000;

export const server = http.createServer((req, res) => {
  try {
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
    } else if (req.url.startsWith('/api/users/') && req.method === 'PUT') {
      const id = req.url.split('/')[3];
      updateUserInfo(req, res, id);
    } else if (req.url.startsWith('/api/users/') && req.method === 'DELETE') {
      const id = req.url.split('/')[3];
      deleteUser(res, id);
    } else {
      res.writeHead(HttpStatus.NOT_FOUND);
      res.end(JSON.stringify({ message: 'not found' }));
    }
  } catch (err) {
    res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        message:
          'Server side error that occurred during the processing of the request',
      })
    );
  }
});
