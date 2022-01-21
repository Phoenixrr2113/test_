require("dotenv").config();
const moment = require("moment");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
var cookieParser = require("cookie-parser");
const PhysicianRouter = require("../controllers/physicianController");
const AppointmentRouter = require("../controllers/appointmentController");

const server = express();

const allowedOrigins = [
  "http://localhost:3000"
];
server.use(function (req, res, next) {
  let origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(express.json());
server.use(cors());
server.use(
  helmet({
    frameguard: false,
  })
);
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.get("/", (req, res) => {
  res.send(`
    <div>
      <h2>
        Welcome to the server! The time is now ${moment()
          .utcOffset(-7)
          .format("h:mm:ss a")} PST / ${moment()
    .utcOffset(-4)
    .format("h:mm:ss a")} EST.
      </h2>
    </div>
  `);
});

server.use("/api/physicians", PhysicianRouter);
server.use("/api/appointments", AppointmentRouter);

module.exports = server;
