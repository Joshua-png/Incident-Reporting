require("dotenv-flow").config();

module.exports = {
  development: {
    username: "roo",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql2",
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  },
};
