const User = require("../models/user");
const bcrypt = require("bcrypt");
const { isValidEmail, isValidPassword } = require("../utils/validators");
// Register user
// POST /register
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isValidEmail(username)) {
      return res.status(400).json({
        success: false,
        code: "USER_EMAIL_INVALID",
        message: "유효하지 않은 이메일 형식입니다.",
      });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        code: "USER_PASSWORD_INVALID",
        message: "유효하지 않은 비밀번호 형식입니다.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Register sucessful", user });
  } catch (err) {
    // MongoDB Duplicate Key
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        code: "USER_EMAIL_DUPLICATED",
        message: "이미 사용 중인 이메일입니다.",
      });
    }

    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "서버 에러",
    });
  }
};

module.exports = { registerUser };
