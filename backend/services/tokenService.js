const Token = require("../models/token");

const findToken = async (userId) => {
  const userToken = await Token.findOne({ user_id: userId });
  return userToken;
};

// 생성한 refresh토큰을 mongoDB에 저장하기 위한 코드
const updateRefresh = async ({ user_id, refreshToken }) => {
  const update = await Token.updateOne(
    { user_id: user_id }, // 조건
    { refreshToken }, // 업데이트 내용
    { upsert: true }
  );
  return update;
};

module.exports = { findToken, updateRefresh };
