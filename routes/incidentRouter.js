const express = require("express");
const {
  createIncident,
  getAllIncidents,
  searchIncidentsByCountry,
} = require("../controllers/incidentController");

const router = express.Router();

router.route("/").post(createIncident);
router.route("/").get(getAllIncidents);
router.route("/search").post(searchIncidentsByCountry);
module.exports = router;
