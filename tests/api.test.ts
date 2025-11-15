import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { server } from '../src/app';
import { users } from '../src/handleRequests';

let baseUrl = '';

const user = {
  username: 'Harry Potter',
  age: 12,
  hobbies: ['quidditch'],
};

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server.listen(0, () => {
      const address = server.address();
      if (address && typeof address === 'object') {
        baseUrl = `http://localhost:${address.port}/api/users`;
      }
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    server.close(() => resolve());
  });
});

describe('CRUD API', () => {
  it('should create a new user with POST', async () => {
    users.length = 0;

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data.username).toBe('Harry Potter');
    expect(data.age).toBe(12);
  });

  it('should get user by id', async () => {
    const user = users[0];

    const res = await fetch(`${baseUrl}/${user.id}`);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.id).toBe(user.id);
  });

  it('should delete user with DELETE', async () => {
    const user = users[0];

    const res = await fetch(`${baseUrl}/${user.id}`, {
      method: 'DELETE',
    });

    expect(res.status).toBe(204);
    expect(users.length).toBe(0);
  });

  it('should return 400 for invalid user ID', async () => {
    const res = await fetch(`${baseUrl}/some-invalid-id`);
    expect(res.status).toBe(400);
  });
});
