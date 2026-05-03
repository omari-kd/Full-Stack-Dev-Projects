# Production API

## Description

Production API is a Node.js-based RESTful API for user management. It provides endpoints for user registration, authentication, and CRUD operations on user data. The API uses Prisma as an ORM for database interactions with PostgreSQL, JWT for authentication, and Swagger for API documentation.

## Features

- User registration and login with JWT authentication
- CRUD operations for users (Create, Read, Update, Delete)
- Password hashing with bcrypt
- CORS support for cross-origin requests
- Comprehensive API documentation with Swagger UI
- Error handling middleware
- Environment-based configuration

## Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd production-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Install main dependencies:

   ```
   npm install express cors dotenv bcrypt jsonwebtoken swagger-ui-express swagger-jsdoc @prisma/client
   ```

4. Install development dependencies:
   ```
   npm install --save-dev nodemon prisma
   ```

## Setup

1. Initialize Prisma:

   ```
   npx prisma init
   ```

2. Configure your database:
   - For an existing database: Set the `DATABASE_URL` in `prisma.config.ts` and run `npx prisma db pull`.
   - For a new database: Run `npx prisma dev` for a local Postgres instance or `npx create-db` for a cloud database.

3. Define your models in `prisma/schema.prisma` (already configured for User model).

4. Run database migration:

   ```
   npx prisma migrate dev --name init
   ```

5. Generate Prisma client:

   ```
   npx prisma generate
   ```

6. Create a `.env` file in the root directory and add your environment variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   JWT_SECRET="your_jwt_secret"
   PORT=3000
   ```

## Running the Application

- For development:

  ```
  npm run dev
  ```

- For production:
  ```
  npm start
  ```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Documentation

API documentation is available via Swagger UI at `http://localhost:3000/api-docs`.

### Key Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users (authenticated)
- `GET /api/users/:id` - Get user by ID (authenticated)
- `PUT /api/users/:id` - Update user (authenticated)
- `DELETE /api/users/:id` - Delete user (authenticated)

All endpoints requiring authentication use Bearer token authentication with JWT.

## Project Structure

```
production-api/
├── install.txt
├── package.json
├── prisma.config.ts
├── generated/          # Generated Prisma client
│   └── prisma/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── server.js       # Main server file
│   ├── config/
│   │   └── prisma.js   # Prisma client configuration
│   ├── controllers/
│   │   └── userController.js  # User-related business logic
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT authentication middleware
│   │   └── errorMiddleware.js # Error handling middleware
│   ├── routes/
│   │   └── userRoutes.js      # User API routes
│   └── swagger/
│       └── swagger.js         # Swagger configuration
└── README.md
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Prisma**: ORM for database management
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Swagger**: API documentation
- **CORS**: Cross-origin resource sharing

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port (default: 3000)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
