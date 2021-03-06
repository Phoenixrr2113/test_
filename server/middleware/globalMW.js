const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

module.exports = {
  authenticate,
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: "The token provided is not valid", err });
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      message: "No token provided, must be set on the Authorization Header",
    });
  }
}
