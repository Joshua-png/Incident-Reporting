// require("dotenv-flow").config();
// const { Sequelize } = require("sequelize");

// // Passing a connection URL
// const sequelize = new Sequelize(process.env.DB_URL, {
//   dialect: "postgres",
//   logging: console.log,
//   dialectOptions: {
//     ssl: true,
//   },
// });

// module.exports = sequelize;

const dotenv = require("dotenv-flow");

// Load environment variables
dotenv.config();
const { Sequelize } = require("sequelize");

// Create Sequelize instance
let sequelize = "";
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize(
    process.env.DB_NAME_TEST,
    process.env.DB_USERNAME_TEST,
    process.env.DB_PASSWORD_TEST,
    {
      dialect: "postgres", // Replace 'mysql' with your database dialect (e.g., 'postgres')
      host: process.env.DB_HOST_TEST, // Your database host
    }
  );
} else {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    logging: console.log,
    dialectOptions: {
      ssl: true,
    },
  });
}

module.exports = sequelize;
