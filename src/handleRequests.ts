import http from 'http';
import dotenv from 'dotenv';
import { HttpStatus, type Users } from './types/types.ts';
import { generateId } from './helpers.ts';

dotenv.config();

export const users: Users = [];

export function getAllUsers(res: http.ServerResponse) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

export function postUser(req: http.IncomingMessage, res: http.ServerResponse) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);

      if (!data.username || !data.age || !data.hobbies) {
        res.writeHead(HttpStatus.BAD_REQUEST, {
          'Content-Type': 'application/json',
        });
        res.end(
          JSON.stringify({
            message: 'Does not contain all of the required fields',
          })
        );
        return;
      }

      const newUser = {
        id: generateId(),
        username: data.username,
        age: data.age,
        hobbies: data.hobbies,
      };

      users.push(newUser);

      res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch {
      res.writeHead(HttpStatus.BAD_REQUEST, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  });
}
