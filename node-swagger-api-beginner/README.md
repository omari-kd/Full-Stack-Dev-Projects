# Node Swagger API - Beginner

A lightweight, educational REST API project demonstrating fundamental API development concepts with interactive Swagger documentation. Perfect for learning REST principles, API design, and documentation best practices.

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and navigate:**

   ```bash
   cd node-swagger-api-beginner
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Access the API:**
   - API Base URL: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs
   - API Home: http://localhost:3000

## Project Purpose

This project serves as an excellent entry point for learning:

- REST API fundamentals
- Express.js framework basics
- OpenAPI/Swagger documentation
- Request/response handling
- Error handling patterns
- Route organization
- Controller-based architecture

## Project Structure

```
node-swagger-api-beginner/
├── controllers/
│   └── usersController.js      # User management logic (CRUD)
├── routes/
│   └── users.js                # User routes with Swagger docs
├── swagger.js                  # Swagger configuration & setup
├── server.js                   # Express app & server startup
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## Architecture Overview

### Layered Architecture

```
Routes (routes/users.js)
    ↓
Controllers (controllers/usersController.js)
    ↓
Data Layer (In-memory users array)
```

### Flow Example

```
GET /api/users
    ↓
Route Handler (routes/users.js)
    ↓
Controller Method (getUsers in usersController.js)
    ↓
Return Response to Client
```

## API Endpoints

### 1. Get All Users

```
GET /api/users
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "adwoa",
    "email": "adwoa@example.com"
  },
  {
    "id": 2,
    "name": "Kojo",
    "email": "kojo@example.com"
  }
]
```

---

### 2. Get User by ID

```
GET /api/users/:id
```

**Path Parameter:**

- `id` (required) - User ID (integer)

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "adwoa",
  "email": "adwoa@example.com"
}
```

**Response (404 Not Found):**

```json
{
  "message": "User not found"
}
```

---

### 3. Create New User

```
POST /api/users
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (201 Created):**

```json
{
  "message": "User created successfully",
  "data": {
    "id": 3,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (400 Bad Request):**

```json
{
  "message": "Name and email are required"
}
```

---

### 4. Update User

```
PUT /api/users/:id
Content-Type: application/json
```

**Path Parameter:**

- `id` (required) - User ID to update

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**Response (200 OK):**

```json
{
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Name",
    "email": "updated@example.com"
  }
}
```

**Response (404 Not Found):**

```json
{
  "message": "User not found"
}
```

---

### 5. Delete User

```
DELETE /api/users/:id
```

**Path Parameter:**

- `id` (required) - User ID to delete

**Response (200 OK):**

```json
{
  "message": "User deleted successfully"
}
```

**Response (404 Not Found):**

```json
{
  "message": "User not found"
}
```

---

## File-by-File Breakdown

### `server.js`

Main Express application setup and server initialization.

**Key Points:**

- Creates Express app instance
- Configures middleware (JSON parser)
- Mounts routes
- Sets up Swagger documentation
- Listens on port 3000

```javascript
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.info(`Server is running on port 3000`);
});
```

---

### `routes/users.js`

Route definitions with embedded Swagger documentation.

**Key Points:**

- Defines REST endpoints
- Includes JSDoc Swagger annotations
- Calls appropriate controller methods
- RESTful endpoint naming conventions

**Swagger Comments:**

- Used to auto-generate API documentation
- Describes what each endpoint does
- Documents request/response formats
- Specifies HTTP status codes

---

### `controllers/usersController.js`

Business logic for user operations.

**Key Operations:**

1. **getUsers()** - Returns all users
2. **getUserById()** - Find user by ID
3. **createUser()** - Add new user with validation
4. **updateUser()** - Modify existing user
5. **deleteUser()** - Remove user from collection

**Key Features:**

- Input validation
- Error handling with appropriate HTTP status codes
- Consistent response formats

---

### `swagger.js`

Swagger/OpenAPI configuration and specifications.

**Defines:**

- API title and description
- API version
- Base path
- Available endpoints
- Contact information

---

## Testing the API

### Using cURL

**Get all users:**

```bash
curl http://localhost:3000/api/users
```

**Get user by ID:**

```bash
curl http://localhost:3000/api/users/1
```

**Create new user:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

**Update user:**

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Updated","email":"jane.updated@example.com"}'
```

**Delete user:**

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Using Postman/Insomnia

1. Import endpoints from Swagger documentation
2. Test each endpoint with different parameters
3. Verify response codes and formats
4. Try error cases (missing fields, invalid IDs)

### Using Swagger UI

- Navigate to http://localhost:3000/api-docs
- Use the interactive "Try it out" button
- Send requests directly from documentation
- See responses in real-time

---

## Key Concepts Demonstrated

### 1. REST Principles

- **GET** - Retrieve resources
- **POST** - Create resources
- **PUT** - Update resources
- **DELETE** - Remove resources
- Proper HTTP status codes (200, 201, 404, 400)

### 2. Request Validation

```javascript
if (!name || !email) {
  return res.status(400).json({
    message: "Name and email are required"
  });
}
```

### 3. Error Handling

```javascript
const user = users.find((user) => user.id === id);
if (!user) {
  return res.status(404).json({
    message: "User not found"
  });
}
```

### 4. Response Consistency

- Structured JSON responses
- Meaningful status codes
- Descriptive error messages
- Data encapsulation

### 5. API Documentation

- Self-documenting code with Swagger JSDoc
- Auto-generated interactive documentation
- Reduces documentation maintenance

---

## Data Flow Example

### Creating a User

1. **Client sends request:**

   ```
   POST /api/users
   Content-Type: application/json

   {
     "name": "Alice",
     "email": "alice@example.com"
   }
   ```

2. **Express receives request** → Parses JSON body

3. **Route handler** → Calls controller

4. **Controller validates** → Checks for required fields

5. **Controller creates** → Generates ID, adds to array

6. **Controller responds** → Returns 201 with new user data

7. **Client receives** → User object with assigned ID

---

## Learning Exercises

### Exercise 1: Add Validation

Enhance email validation using regex or validator library

### Exercise 2: Add Persistence

Replace in-memory storage with file-based storage (JSON file)

### Exercise 3: Add Pagination

Implement limit/offset pagination for Get All Users

### Exercise 4: Add Filtering

Filter users by name or email in Get All endpoint

### Exercise 5: Database Integration

Connect to real database (SQLite, PostgreSQL)

### Exercise 6: Authentication

Add JWT token authentication to protected endpoints

### Exercise 7: Rate Limiting

Implement rate limiting to prevent API abuse

### Exercise 8: Logging

Add logging middleware to track requests

---

## Scripts

```bash
# Start server (production mode)
npm start

# Start server with auto-reload (development)
npm run dev

# Run tests (configured but not yet implemented)
npm test
```

---

## Dependencies Explained

| Package            | Version | Purpose                             |
| ------------------ | ------- | ----------------------------------- |
| express            | ^5.2.1  | Web framework for Node.js           |
| swagger-jsdoc      | ^6.2.8  | Convert JSDoc to Swagger/OpenAPI    |
| swagger-ui-express | ^5.0.1  | Serve Swagger UI in Express         |
| nodemon            | ^3.1.14 | Auto-restart server on file changes |

---

## 🔍 Common Issues & Solutions

### Issue: Port 3000 already in use

**Solution:** Change PORT in server.js or kill process on port 3000

### Issue: Swagger docs not loading

**Solution:** Ensure swagger.js is properly configured and mounted

### Issue: JSON parsing fails

**Solution:** Check Content-Type header is `application/json`

### Issue: Lost data after server restart

**Solution:** This is expected - data is in-memory only. Use production-api for persistence.

---

## Checklist for Beginners

- [ ] Clone the project
- [ ] Run `npm install`
- [ ] Start server with `npm run dev`
- [ ] Open http://localhost:3000/api-docs
- [ ] Test each endpoint in Swagger UI
- [ ] Review route definitions in `routes/users.js`
- [ ] Study controller logic in `controllers/usersController.js`
- [ ] Try adding a new endpoint
- [ ] Modify Swagger documentation
- [ ] Test with different request bodies

---

## Next Steps

After mastering this project:

1. **Explore the Production API** - See advanced patterns
2. **Add Database** - Replace in-memory storage
3. **Implement Authentication** - Add JWT tokens
4. **Add Middleware** - Error handling, logging
5. **Deploy** - Push to Heroku or similar

---

## API Response Codes

| Code | Meaning      | When Used                   |
| ---- | ------------ | --------------------------- |
| 200  | OK           | Successful GET, PUT, DELETE |
| 201  | Created      | Successful POST             |
| 400  | Bad Request  | Missing required fields     |
| 404  | Not Found    | User doesn't exist          |
| 500  | Server Error | Unhandled errors            |

---

## Tips

1. Use Swagger UI to understand the API before coding
2. Always validate input before processing
3. Return consistent response formats
4. Use appropriate HTTP status codes
5. Keep controllers focused on business logic
6. Keep routes focused on routing

---

## Further Learning

- [Express.js Documentation](https://expressjs.com/)
- [OpenAPI/Swagger Specification](https://swagger.io/specification/)
- [RESTful API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

---

## License

ISC

---

**Happy Learning!**

Start with this project to understand REST fundamentals, then move to production-api for real-world patterns.
