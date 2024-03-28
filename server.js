// Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more
require("dotenv-flow").config();
const express = require("express");
const sequelize = require("./config/db");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const IncidentRouter = require("./routes/incidentRouter");
require("express-async-errors");

const app = express();
const PORT = process.env.PORT || 4000;

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Incident Reporting",
      version: "1.0.0",
    },
  },
  apis: [
    "./routes/*.js",
    "./controllers/*.js",
    "./models/*.js",
    "./swagger.yaml",
  ],
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Homepage
app.get("/", (req, res) => {
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Incident Reporting</title>
        </head>
        <body>
            <h1>Link to API docs</h1>
            <br />
            <h3>(A swagger UI implementation to enable one run test this API.)</h3>
            <br />
            <a href="https://incident-reporting.onrender.com/api-docs">Please click the link to access the api docs</a>
        </body>
        </html>
    `;
  res.status(StatusCodes.OK).send(htmlContent);
});

// Middleware
app.use(express.json());
const {
  errorHandlerMiddleware,
} = require("./middleware/errorHandlerMiddleware");
const { StatusCodes } = require("http-status-codes");

// Incident Route
app.use("/api/v1/incidents", IncidentRouter);

// Not found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route not Found" });
});

// Error Route
app.use(errorHandlerMiddleware);

// Exporting the app
module.exports = app;

// Connecting to the Database
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
