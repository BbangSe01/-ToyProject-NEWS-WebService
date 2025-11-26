<template>
  <div class="login-area">
    <img :src="authImg" alt="인증 이미지" class="auth-img" />
    <div class="login-comments">Login</div>
    <form class="login-form-area" @submit.prevent="logIn()">
      <LoginInput v-model="baseInput" />
      <button class="login-btn" type="submit">LogIn</button>
    </form>
    <div class="go-signup">
      <p class="signup-comment">Don't have an account?</p>
      <router-link to="/signup" class="go-signup-btn">Sign up</router-link>
    </div>
    <!-- <div class="signup-error">
      <p v-if="touched.username && !usernameValid">
        - Please enter a valid email address.
      </p>
      <p v-if="touched.password && !passwordValid">
        - Please enter a password with at least one letter, one number, and at
        least 4 characters in total.
      </p>
      <p v-if="passwordValid && !checkPassword">- Passwords do not match.</p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import authImg from "../../../assets/images/auth-img.png";
  import type { baseInputType } from "../../../types";
  import LoginInput from "./LoginInput.vue";
  import { login } from "../../../apis/AuthApis";
  import { useTokenDataStore } from "../../../stores/tokenData";
  import { useRouter } from "vue-router";
  import Swal from "sweetalert2";
  import { reactive, watch, ref, computed } from "vue";

  const router = useRouter();
  const baseInput = ref<Omit<baseInputType, "password2">>({
    username: "",
    password: "",
  });

  const tokenStore = useTokenDataStore();
  const logIn = async () => {
    try {
      const res = await login({
        username: baseInput.value.username,
        password: baseInput.value.password,
      });
      tokenStore.setAccessToken(res.data.token);
      Swal.fire({
        title: "Success!",
        text: "Login Success!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      router.push({ name: "Headline" });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "The username or password you entered is incorrect.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
</script>

<style>
  .login-area {
    margin-top: 7rem;
    display: flex;
    width: 30%;
    flex-direction: column;
    align-items: center;
  }
  .auth-img {
    width: 150px;
    height: 150px;
  }
  .login-comments {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 2.5rem;
  }
  .login-form-area {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .login-btn {
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
  .signup-error {
    display: flex;
    flex-direction: column;
    width: 19rem;
  }
  .signup-error p {
    color: red;
    font-size: 0.8rem;
    margin-bottom: -0.2rem;
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
