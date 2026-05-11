const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Production API",
      version: "1.0.0",
      description: "API documentation for User Management System"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    tags: [
      {
        name: "Users",
        description: "User management"
      },
      {
        name: "Products",
        description: "Product management routes"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

