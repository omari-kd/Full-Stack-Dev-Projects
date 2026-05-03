const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "API is running"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
