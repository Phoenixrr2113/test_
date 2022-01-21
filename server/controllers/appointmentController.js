const router = require("express").Router();
const db = require("../models/appointmentModel");
const { authenticate } = require("../middleware/globalMW.js");
const uuid = require("uuid/v4");

router.get("/", (req, res) => {
  db.getAppointments()
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getAppointment(id)
    .then((found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "Appointment Not Found" });
      }
    })
    .catch((error) => {
      res.status(error.code || 404).json({ message: error.message });
    });
});

module.exports = router;
