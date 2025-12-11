const { timeStamp } = require("console");
const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

// mongoose.model() -> 스키마로 실제 모델(컬렉션 조작 객체)을 만드는 명령어
// 모델을 통해 db에 저장/조회/삭제 등을 수행함.
module.exports = mongoose.model("Token", tokenSchema);
