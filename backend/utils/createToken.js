const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_SECRET;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_SECRET;
const makeToken = (payload) => {
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "15m" });
  return token;
};

const makeRefreshToken = (payload) => {
  // refresh token 발급
  const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  return refreshToken;
};

module.exports = { makeToken, makeRefreshToken };
