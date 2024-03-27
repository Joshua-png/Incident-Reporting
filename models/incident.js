"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../config/db");
module.exports = sequelize.define(
  "Incident",
  {
    client_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    incident_desc: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    weather_report: {
      type: Sequelize.JSON,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    modelName: "Incident",
    paranoid: true,
  }
);

// (sequelize, DataTypes) => {
//   class Incident extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Incident.init({
//     client_id: DataTypes.INTEGER,
//     incident_desc: DataTypes.STRING,
//     city: DataTypes.STRING,
//     country: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Incident',
//   });
//   return Incident;
// };
