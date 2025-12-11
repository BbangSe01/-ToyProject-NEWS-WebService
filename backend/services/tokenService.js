const Token = require("../models/token");

const findToken = async (userId) => {
  const userToken = await Token.findOne({ _id: userId });
  return userToken;
};

// 생성한 refresh토큰을 mongoDB에 저장하기 위한 코드
const updateRefresh = async ({ _id, refreshToken }) => {
  const update = await Token.updateOne(
    { _id },
    { _id, refreshToken },
    { upsert: true }
  );
  return update;
};

module.exports = { findToken, updateRefresh };
