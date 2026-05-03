require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const cors = require("cors");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger/swagger");

const userRoutes = require("./routes/userRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
