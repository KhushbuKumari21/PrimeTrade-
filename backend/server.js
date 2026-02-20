require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const swaggerUI = require("swagger-ui-express");

const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

// VERSIONED API

app.use("/api/v1/auth", require("./routes/authRoutes"));

app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// SWAGGER

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prime API",
      version: "1.0",
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(
  "/api-docs",

  swaggerUI.serve,

  swaggerUI.setup(swaggerSpec),
);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
