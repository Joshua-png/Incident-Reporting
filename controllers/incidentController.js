// controllers/incidentController.js
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/CustomErrors");
const Incident = require("../models/incident");
const weatherService = require("../services/weatherService");
const { Sequelize, Op } = require("sequelize");

// Create an Incident Controller
const createIncident = async (req, res) => {
  try {
    const { incident_desc, city, country } = req.body;
    const weatherReport = await weatherService.getWeather(city, country);
    const incident = await Incident.create({
      incident_desc,
      city,
      country,
      date: new Date(),
      weather_report: weatherReport,
    });

    if (!incident) {
      throw new BadRequestError("Incident was not created");
    }

    res
      .status(StatusCodes.CREATED)
      .json({ incident, msg: "Incident created successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getAllIncidents = async (req, res) => {
  try {
    // Implement filtering by city, temperature range, and humidity range
    const { city, temperature_max, temaperature_min, humidity } = req.query;

    let filters = {};

    if (city) {
      filters.city = { [Op.iLike]: `%${city}%` };
    }

    if (
      temperature_max &&
      temaperature_min &&
      temperature_max > temaperature_min
    ) {
      filters["weather_report.main.temp"] = {
        [Sequelize.Op.between]: [temperature_max, temaperature_min],
      };
    }

    if (humidity) {
      filters["weather_report.main.humidity"] = humidity;
    }

    const incidents = await Incident.findAll({
      where: filters,
    });
    res.status(StatusCodes.OK).json({ incidents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Incidents By Country
const searchIncidentsByCountry = async (req, res) => {
  try {
    const { country } = req.body;
    if (!country) {
      throw new BadRequestError("Please provide the country name");
    }

    const incidents = await Incident.findAll({
      where: {
        country: {
          [Op.iLike]: `%${country}%`,
        },
      },
    });

    // const incidents = await Incident.findAll({ where: { country } });
    res.status(StatusCodes.OK).json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createIncident, getAllIncidents, searchIncidentsByCountry };
