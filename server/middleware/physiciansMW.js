const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets.js");

// quickly see what this file exports
module.exports = {
  makejwt,
};

function makejwt(physician) {
  if (physician) {
    const payload = {
      email: physician.email,
    };
    const options = {
      expiresIn: "1h",
    };
    return jwt.sign(payload, jwtSecret, options);
  }
}

