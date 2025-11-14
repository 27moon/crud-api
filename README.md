# CRUD API Project

This is a simple CRUD (Create, Read, Update, Delete) API for managing users.

---

## Installation

1. Clone the repository:

```
git clone <repository-url>
```

2. Go to the repository folder:

```
cd <repository-folder>
```

3. Install dependencies:

```
npm install
```

4. Create a .env file with:

```
PORT=4000
```

## Running the Application

### Development Mode

```
npm run start:dev
```

### Production Mode

```
npm run start:prod
```

## API Endpoints

Base URL: `http://localhost:<PORT>/api/users`

1. Get all users
   `GET /api/users`

   ```
   curl http://localhost:4000/api/users
   ```

Response: 200 OK

Returns an array of users. Initially empty.

2. Get user by ID
   `GET /api/users/{userId}`

   ```
   curl http://localhost:4000/api/users/<userId>
   ```

Response 200 OK — user found.

Response 400 Bad Request — invalid UUID.

Response 404 Not Found — user does not exist.

3. Create a new user
   `POST /api/users`

```
curl -X POST http://localhost:4000/api/users \
-H "Content-Type: application/json" \
-d '{"username":"Harry Potter","age":12,"hobbies":[quidditch"]}'
```

Response 200 OK — user created.

Response 400 Bad Request — missing required fields or invalid JSON.

4. Update a user
   `PUT /api/users/{userId}`

   ```
   curl -X PUT http://localhost:4000/api/users/<userId> \
   -H "Content-Type: application/json" \
   -d '{"username":"Hermione Granger","age":12,"hobbies":["reading"]}'
   ```

Response 200 OK — user updated.

Response 400 Bad Request — invalid UUID or missing fields.

Response 404 Not Found — user does not exist.

5. Delete a user
   `DELETE /api/users/{userId}`
   ```
   curl -X DELETE http://localhost:4000/api/users/<userId>
   ```

Response 204 No Content — user deleted.

Response 400 Bad Request — invalid UUID.

Response 404 Not Found — user does not exist.

### Testing
To run the tests:
```
npm run test
```