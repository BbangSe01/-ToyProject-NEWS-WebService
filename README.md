# 📰 뉴스 검색 서비스

## 📌 개발 목적
- **TypeScript 기반 SPA 개발 능력 강화**
- **Node.js 학습 및 백엔드 직접 구현 경험**

---
<br>

## ✨ 현재 구현된 기능

## 🚀 FrontEnd (Vue 3)

### 📰 헤드라인 뉴스
- 카테고리별 최신 헤드라인 제공  
- 카드 클릭 시 **모달 기반 상세 페이지** 표시  
- Vue Teleport 활용한 자연스러운 모달 UX

### 🔍 검색 기능
- 키워드 기반 뉴스 검색  
- 정렬 옵션 제공: **최신순 / 정확도 / 인기순**  
- Pagination 기반 **더보기 버튼** 제공  
- 검색어는 **Session Storage(pinia-plugin-persistedstate)** 로 유지  

### ⚙ 기타 기능
- Pinia 기반 전역 상태 관리  
- 로딩 / 에러 처리  
- 드롭다운 / 모달 애니메이션 적용  

<br><br>

## 🛠 Backend (Express)

### 🔐 회원 인증 기능
- `bcrypt` 를 사용한 비밀번호 해싱  
- `JWT` 기반 로그인 및 인증 토큰 발급  
- 회원가입 / 로그인 API 구현  

<br>

### ✂️ 뉴스 요약 기능
- `puppeteer` 를 활용한 본문 HTML 크롤링  
- `readability` 로 기사 본문 추출  
- 추출된 텍스트 기반 요약문 생성 컨트롤러 구현

---

## 🗺 구현 예정 기능
- [ ] 요약문 불러올 때의 화면 처리  
- [ ] API 요청 시 서버 JWT 검증 미들웨어 추가  
- [ ] 즐겨찾기 기능  
- [ ] 📱 반응형 UI 적용  

---

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

<br>

---

