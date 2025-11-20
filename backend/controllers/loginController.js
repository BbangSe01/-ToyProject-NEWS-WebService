const User = require("../models/user");
const bcrypt = require("bcrypt");
// Register user
// POST /register
const registerUser = async (req, res) => {
  const { username, password, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hashedPassword,
  });
  res.status(201).json({ message: "Register sucessful", user });
};

module.exports = { registerUser };
