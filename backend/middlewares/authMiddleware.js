const jwt = require("jsonwebtoken");

const key = process.env.JWT_SECRET;
const authenticateToken = (req, res, next) => {
  // jwt.verify => 토큰 검증
  // 헤더 형식: Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];

  // 토큰이 없거나 형식이 Bearer 로 시작하지 않으면 401 Unauthorized 반환
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    // 토큰이 아예 없는 경우
    return res.status(401).json({
      message: "인증 토큰이 누락되었습니다.",
    });
  }

  // 토큰 검증
  jwt.verify(token, key, (err, user) => {
    // 검증 중 오류 발생 (예: 만료, 위변조, 서명 불일치 등)
    if (err) {
      console.error("JWT 검증 오류:", err.name);
      // 만료 오류 처리
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "토큰이 만료되었습니다." });
      }
      // 일반적인 검증 실패 (위변조 등)
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }

    // 검증 성공: 페이로드 정보 저장 및 다음 미들웨어로 전달
    // 'user'는 jwt.sign() 시 사용한 payload 객체입니다.
    req.user = user;

    // 다음 미들웨어/라우트 핸들러로 이동
    next();
  });
};

module.exports = authenticateToken;
