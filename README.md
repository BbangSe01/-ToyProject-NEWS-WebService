# 📰 뉴스 검색 서비스

## 📌 개발 목적

- **TypeScript 기반 SPA 개발 능력 강화**
- **Node.js 학습 및 백엔드 직접 구현 경험**

<br>

## ✨ 현재 구현된 기능

### **🚀 FrontEnd (Vue 3)**

### 📰 헤드라인 뉴스

- 카테고리별 최신 헤드라인 제공
- 카드 클릭 시 **모달 기반 상세 페이지** 표시
- Vue Teleport 활용한 자연스러운 모달 UX

### 🔍 검색 기능

- 키워드 기반 뉴스 검색
- 정렬 옵션 제공: **최신순 / 정확도 / 인기순**
- Pagination 기반 **더보기 버튼** 제공
- 검색어는 **Session Storage(pinia-plugin-persistedstate)** 로 유지

### 📝 뉴스 요약 기능

- 로그인한 사용자만 이용 가능한 서비스
- 요약 호출 성공 시, 자동으로 모달창 최하단으로 스크롤 되도록 scrollIntoView 활용
- Vue의 nextTick을 활용하여, 요약문 컴포넌트의 DOM이 렌더링된 이후 scrollIntoView 메서드가 안전하게 실행되도록 처리

### 🔐 로그인 / 회원가입

- 회원가입 시, 자체 유효성 검사 Util 함수 적용하여 입력 오류 사전에 방지
- pinia persistence 적용하여 새로고침/브라우저 리로드 시에도 로그인 유지

### ⚙ 기타 기능

- Pinia 기반 전역 상태 관리
- 로딩 / 에러 처리
- 드롭다운 / 모달 애니메이션 적용

<br>

---

<br>

### **🛠 Backend (Express)**

### 🔐 회원 인증 기능

- `bcrypt` 를 사용한 비밀번호 해싱
- `JWT` 기반 로그인 및 인증 토큰 발급
- 회원가입 / 로그인 API 구현

<br>

### ✂️ 뉴스 요약 기능

- `puppeteer` 를 활용한 본문 HTML 크롤링
- `readability` 로 기사 본문 추출
- 추출된 텍스트 기반 요약문 생성 컨트롤러 구현

<br>

## 🗺 구현 예정 기능

- [ ] API 요청 시 서버 JWT 검증 미들웨어 추가
- [ ] 즐겨찾기 기능
- [ ] 반응형 UI 적용

<br>

## 🧰 Tech Stack

### 🎨 Frontend

- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia

### 🖥 Backend

- Node.js (Express)

### 🌐 API

- NewsAPI.org

---
