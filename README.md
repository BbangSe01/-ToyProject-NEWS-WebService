# 📰 뉴스 검색 서비스

## 📌 개발 목적
- **TypeScript 기반 SPA 개발 능력 강화**
- **Node.js 학습 및 백엔드 직접 구현 경험**

---

## ✨ 현재 구현된 기능

### 📰 헤드라인 뉴스
- 카테고리별 최신 헤드라인 제공  
- 카드 클릭 시 **모달 기반 상세 페이지** 표시  
- Vue Teleport 활용한 자연스러운 모달 UX  

### 🔍 검색 기능
- 키워드 기반 뉴스 검색  
- 정렬 옵션 제공: **최신순 / 정확도 / 인기순**  
- Pagination 기반 **더보기 버튼**  
- 검색어는 **Session Storage(pinia-plugin-persistedstate)** 로 유지

### ⚙ 기타 기능
- Pinia 기반 전역 상태 관리  
- 로딩 / 에러 처리  
- 드롭다운/모달 애니메이션 적용

---

## 🗺 구현 예정 기능

- [ ] **Express 기반 백엔드 서버 구축**  
  - 로그인 / 회원가입
- [ ] 로그인 사용자 전용 **AI 뉴스 요약 기능**
- [ ] 🌐 **한/영 언어 전환**  
- [ ] 📱 반응형 적용

---

## 🛠 Tech Stack

### **Frontend**
- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia

### **Backend (예정)**
- Node.js (Express)

### **API**
- NewsAPI.org

---
