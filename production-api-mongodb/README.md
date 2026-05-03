# Production API

This repository contains a Node.js Express API for user management, built with MongoDB and Mongoose. It includes authentication with JSON Web Tokens (JWT), password hashing using bcrypt, CORS support, centralized error handling, and Swagger API documentation.

## Features

- User registration and login
- JWT-based authentication middleware
- Protected routes for user listing, retrieval, update, and deletion
- Password hashing with bcrypt
- MongoDB connection via Mongoose
- Swagger documentation available at `/api-docs`
- Error handling middleware for consistent API responses

## Technology Stack

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv
- Swagger (swagger-jsdoc, swagger-ui-express)

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root.

4. Add required environment variables:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=3000
```

## Available Scripts

- `npm run dev` - start the server with `nodemon` for development.
- `npm start` - start the server with Node.
- `npm test` - placeholder test script.

## Running the Server

Start the application in development mode:

```bash
npm run dev
```

Or start in production mode:

```bash
npm start
```

The server listens on the port defined by `PORT`, or defaults to `3000`.

## Environment Variables

Required variables:

- `MONGO_URI` - connection string for the MongoDB database
- `JWT_SECRET` - secret key for signing JWT tokens
- `PORT` - optional server port

## Project Structure

Root files:

- `package.json` - npm project metadata and scripts
- `.env` - environment variables for MongoDB and JWT (not committed)
- `README.md` - project documentation

Source tree:

- `src/`
  - `server.js` - application entrypoint and middleware setup
  - `config/`
    - `db.js` - MongoDB connection logic
  - `controllers/`
    - `userController.js` - controller actions for user operations
  - `middleware/`
    - `authMiddleware.js` - JWT authentication middleware
    - `errorMiddleware.js` - centralized error handler
  - `models/`
    - `User.js` - Mongoose schema for users
  - `routes/`
    - `userRoutes.js` - user-related API routes
  - `swagger/`
    - `swagger.js` - Swagger documentation configuration

## API Endpoints

### Public Endpoints

- `POST /api/users/register`
  - Register a new user.
  - Required JSON body:
    - `name`
    - `email`
    - `password`

- `POST /api/users/login`
  - Login and receive a JWT token.
  - Required JSON body:
    - `email`
    - `password`

### Protected Endpoints

All protected endpoints require the `Authorization` header in the form:

```
Authorization: Bearer <token>
```

- `GET /api/users`
  - Retrieve all users.

- `GET /api/users/:id`
  - Retrieve a single user by ID.

- `PUT /api/users/:id`
  - Update a user by ID.
  - Optional JSON body fields:
    - `name`
    - `email`
    - `password`

- `DELETE /api/users/:id`
  - Delete a user by ID.

## Swagger API Documentation

Open the API documentation in a browser at:

```
http://localhost:3000/api-docs
```

## Notes

- The API uses `bcrypt` to hash user passwords before storage.
- The authentication middleware validates JWT tokens using `JWT_SECRET`.
- If the MongoDB connection fails, the server logs the error and exits.

## Troubleshooting

- Verify `MONGO_URI` is correct and MongoDB is accessible.
- Ensure `JWT_SECRET` is defined for login and protected routes.
- Confirm the server is running on the correct port.

## License

This project is provided under the ISC license.
