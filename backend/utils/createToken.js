const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_SECRET;
const makeToken = (Object) => {
  const token = jwt.sign(Object, JWT_KEY, { expiresIn: "15m" });
  return token;
};

const makeRefreshToken = () => {
  // refresh token 발급
  const refreshToken = jwt.sign({}, JWT_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  return refreshToken;
};

module.exports = { makeToken, makeRefreshToken };
