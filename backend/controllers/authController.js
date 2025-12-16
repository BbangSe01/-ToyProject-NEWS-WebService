const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
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
    });
    const refreshToken = makeRefreshToken({ userId: user._id });
    await updateRefresh({
      user_id: user._id,
      refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // XSS 방지를 위해 JS 접근 차단
      secure: false, // 현재 개발서버(HTTP) 환경이므로 false
      sameSite: "lax",
      path: "/", // CSRF 방지, 원래는 refresh 요청에만 열어두어야 하지만 현재 프론트/백 모두 개발서버여서 오류가 많아 모든 요청 허용
      maxAge: 7 * 24 * 60 * 60 * 1000, //7일
    });
    return res.json({ accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      loginSuccess: false,
      message: "로그인 중 오류 발생",
    });
  }
};

// logout user
// POST /logout
const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(200).send({
      message: "이미 로그아웃 되었습니다.(요청에 토큰을 찾을 수 없습니다.)",
    });
  }

  let dbRevocationFailed = false; // DB 처리 실패 유무
  // refreshTokoen db 제거 로직
  try {
    await Token.findOneAndDelete({ refreshToken: refreshToken });
  } catch (dbError) {
    console.error("Refresh Token DB 해지 중 오류 발생:", dbError);
    dbRevocationFailed = true;
  }

  // 쿠키에서 refreshToken 제거
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  if (dbRevocationFailed) {
    // DB는 실패했지만 클라이언트 쿠키는 제거되었으므로 200 OK와 함께 경고 메시지 반환
    // 실서비스라면 관리자 처리 로직이 필요
    return res.status(200).send({
      message:
        "로그아웃 되었습니다. (refreshToken DB 해지 실패, 관리자 확인 필요).",
    });
  } else {
    // 모든 처리가 완벽히 성공
    return res.status(200).send({ message: "로그아웃 되었습니다." });
  }
};

// accessToken 재발급
const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      code: "REFRESH_TOKEN_MISSING",
      message: "Authentication required",
    });
  }

  try {
    // DB 존재 여부 검증
    const tokenDoc = await Token.findOne({ refreshToken: refreshToken });
    if (!tokenDoc) {
      return res.status(401).json({
        code: "REFRESH_TOKEN_INVALID",
        message: "Authentication required",
      });
    }

    // JWT 자체 검증
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // access token 재발급
    const accessToken = makeToken({
      userId: payload.userId,
    });

    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({
      code:
        err.name === "TokenExpiredError"
          ? "REFRESH_TOKEN_EXPIRED"
          : "REFRESH_TOKEN_INVALID",
      message: "Authentication required",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };
