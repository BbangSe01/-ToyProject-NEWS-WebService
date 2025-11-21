<template>
  <div class="signup-area">
    <img :src="authImg" alt="인증 이미지" class="signup-img" />
    <div class="signup-comments">User Sign Up</div>
    <form class="signup-form-area" @submit.prevent="signUp()">
      <SignupInput v-model="baseInput" />
      <button class="signup-btn" type="submit">Sign Up</button>
    </form>
    <!-- <p v-if="usernameValid">올바른 이메일 주소를 입력하세요.</p>
    <p v-if="passwordValid">올바른 비밀번호를 입력하세요.</p>
    <p v-if="!checkPassword">비밀번호 불일치</p> -->
  </div>
</template>

<script setup lang="ts">
  import authImg from "../../../assets/images/auth-img.png";
  import type { baseInputType } from "../../../types";
  import {
    isValidEmail,
    isValidPassword,
    isSamePassword,
  } from "../../../utils/validators";
  import SignupInput from "./SignupInput.vue";
  import { signup } from "../../../apis/AuthApis";
  import { reactive, watch, ref, computed } from "vue";

  const baseInput = ref<baseInputType>({
    username: "",
    password: "",
    password2: "",
  });

  const usernameValid = computed(() => isValidEmail(baseInput.value.username));
  const passwordValid = computed(() =>
    isValidPassword(baseInput.value.password)
  );
  const checkPassword = computed(() =>
    isSamePassword({
      password: baseInput.value.password,
      password2: baseInput.value.password2,
    })
  );

  const signUp = async () => {
    try {
      const res = await signup({
        username: baseInput.value.username,
        password: baseInput.value.password,
        password2: baseInput.value.password2,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
</script>

<style>
  .signup-area {
    margin-top: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .signup-img {
    width: 150px;
    height: 150px;
  }
  .signup-comments {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 2.5rem;
  }
  .signup-form-area {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .signup-btn {
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
</style>
