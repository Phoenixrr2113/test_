const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");
const physiciansMW = require("../middleware/physiciansMW");
const db = require("../models/physicianModel");
const { authenticate } = require("../middleware/globalMW.js");
const uuid = require("uuid/v4");

router.get("/", (req, res) => {
  db.getPhysicians()
    .then((found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "No physicians found" });
      }
    })
    .catch((error) => {
      res.status(error.code || 404).json({ message: error.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getPhysician(id)
    .then((found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "Physician Not Found" });
      }
    })
    .catch((error) => {
      res.status(error.code || 404).json({ message: error.message });
    });
});

// get appointments for a physician
router.get("/:id/appointments", (req, res) => {
  const { id } = req.params;
  db.getAppointmentsByPhysician(id)
    .then((found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "No appointments found" });
      }
    })
    .catch((error) => {
      res.status(error.code || 404).json({ message: error.message });
    });
});

module.exports = router;
