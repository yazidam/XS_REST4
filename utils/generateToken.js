const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, "0000", {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
