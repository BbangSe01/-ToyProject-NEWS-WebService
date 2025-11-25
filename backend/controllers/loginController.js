const User = require("../models/user");
const bcrypt = require("bcrypt");
const { isValidEmail, isValidPassword } = require("../utils/validators");
// Register user
// POST /register
const registerUser = async (req, res) => {
  try {
    const { username, password, password2 } = req.body;
    if (password !== password2) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!isValidEmail(username)) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 이메일 형식입니다." });
    }
    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 비밀번호 형식입니다." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Register sucessful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};

module.exports = { registerUser };
