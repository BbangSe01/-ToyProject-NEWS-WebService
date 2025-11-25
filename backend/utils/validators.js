const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영어 알파벳 1개 이상 + 숫자 1개 이상 + 전체 4자 이상
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return passwordPattern.test(password);
}
module.exports = {
  isValidEmail,
  isValidPassword,
};
