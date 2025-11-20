<template>
  <div class="auth-area">
    <img :src="authImg" alt="인증 이미지" class="auth-img" />
    <div class="auth-comments">
      {{ isLogin ? "User Login" : "User Sign Up" }}
    </div>
    <form class="auth-input-area">
      <input required placeholder="  Email" type="email" />
      <input required placeholder="  Password" type="password" />
      <input
        v-if="!isLogin"
        required
        placeholder="  Confirm Password"
        type="password"
      />
    </form>
    <button class="auth-btn">{{ isLogin ? "Login" : "Sign Up" }}</button>
    <div v-if="isLogin" class="go-signup">
      <p class="signup-comment">Don't have an account?</p>
      <router-link to="/signup" class="go-signup-btn">Sign up</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import authImg from "../../../assets/images/auth-img.png";
  import { defineProps } from "vue";

  const props = defineProps<{
    isLogin: boolean;
  }>();

  // 서버 구성 후 유효성 검사 추가하기
</script>

<style scoped>
  /* input , button 태그 사이즈 동일하게 하기 위함 */
  input,
  button {
    box-sizing: border-box;
  }

  .auth-area {
    margin-top: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .auth-img {
    width: 150px;
    height: 150px;
  }
  .auth-comments {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 2.5rem;
  }
  .auth-input-area {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .auth-input-area input {
    width: 18rem;
    height: 2rem;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
  .auth-btn {
    margin-top: 1rem;
    width: 18rem;
    height: 2.5rem;
    background-color: black;
    color: white;
    border: 2px solid black;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2rem;
  }
  .go-signup {
    margin-top: 1.5rem;
    border-top: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 18rem;
    font-size: 0.9rem;
  }
  .go-signup-btn {
    color: inherit;
    width: 3.5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    font-weight: 700;
  }
  .go-signup-btn:hover {
    color: purple;
  }
</style>
