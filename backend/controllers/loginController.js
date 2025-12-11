const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidEmail, isValidPassword } = require("../utils/validators");
const { makeToken, makeRefreshToken } = require("../utils/createToken");
const { updateRefresh } = require("../services/tokenService");
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

// login user
// POST /login
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        loginSuccess: false,
        message: "유효하지 않은 이메일 혹은 비밀번호 형식입니다.",
      });
    }
    // db에서 요청한 email이 있다면 비밀번호가 같은지 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({
        loginSuccess: false,
        message: "유효하지 않은 이메일 혹은 비밀번호 형식입니다.",
      });
    }

    const accessToken = makeToken({
      userId: user._id,
      username: user.username,
    });
    const refreshToken = makeRefreshToken();

    await updateRefresh({
      _id: user._id,
      refreshToken,
    });
    return res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      loginSuccess: false,
      message: "로그인 중 오류 발생",
    });
  }
};

module.exports = { registerUser, loginUser };

// https://hello-judy-world.tistory.com/74
