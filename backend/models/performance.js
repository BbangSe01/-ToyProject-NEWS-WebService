const mongoose = require("mongoose"); // 몽구스를 가져온다.
// mongoose.schema -> MongoDB 컬렉션 문서의 구조(필드/타입/옵션)를 정함
const performanceSchema = mongoose.Schema({
  author: String,
  description: String,
  publishedAt: String,
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  urlToImage: {
    type: String,
  },
});

// mongoose.model() -> 스키마로 실제 모델(컬렉션 조작 객체)을 만드는 명령어
// 모델을 통해 db에 저장/조회/삭제 등을 수행함.
module.exports = mongoose.model("Performance", performanceSchema);
