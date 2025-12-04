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

### 📝 뉴스 요약 기능

- 로그인한 사용자만 이용 가능한 서비스
- 요약 요청 성공 시, 자동으로 모달창 최하단으로 스크롤 되어 요약문 한 눈에 파악 가능
- Vue의 nextTick을 활용하여, 요약문 컴포넌트의 DOM이 렌더링된 이후 안전하게 스크롤하도록 처리

### ⚙ 기타

- Pinia 기반 전역 상태 관리
- 회원가입 시, 자체 유효성 검사 Util 함수 적용하여 입력 오류 사전에 방지
- 로딩 / 에러 UI 처리

<br>

---

<br>

### **🛠 Backend (Express)**

### 🔐 회원 인증 기능

- `bcrypt` 를 사용한 비밀번호 해싱
- `JWT` 기반 로그인 및 인증 토큰 발급
- 토큰 검증 미들웨어 추가

<br>

### ✂️ 뉴스 요약 기능

- `puppeteer 기반` 비동기 HTML 크롤링
- `readability-js`를 사용한 핵심 본문 추출
- 추출된 텍스트 기반 요약문 생성 컨트롤러 구현

<br>

## 🗺 구현 예정 기능

- [ ] Refresh Token 도입
- [ ] 한/영 변환 기능
- [ ] 북마크 기능

<br>

## 🧰 Tech Stack

### 🎨 Frontend

- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia

### 🖥 Backend

- Node.js (Express)
- MongoDB

### 🌐 API

- NewsAPI.org

---
