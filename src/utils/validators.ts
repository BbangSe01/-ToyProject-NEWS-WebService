// 이메일 유효성 검사 정규식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일 유효성 검사 메서드
export const isValidEmail = (email: string): boolean => {
  return !emailPattern.test(email);
};

// 비밀번호 정규식 (프로젝트 규모에 맞게 약소한 조건으로 설정)
// 영어 알파벳 1개 이상 + 숫자 1개 이상 + 전체 4자 이상
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

// 비밀번호 유효성 검사 메서드
export const isValidPassword = (password: string): boolean => {
  return !passwordPattern.test(password);
};

// 비밀번호 확인 메서드
export const isSamePassword = ({
  password,
  password2,
}: {
  password: string;
  password2: string;
}): boolean => {
  return password === password2;
};
