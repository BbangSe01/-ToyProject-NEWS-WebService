<template>
  <div class="signup-area">
    <img :src="authImg" alt="인증 이미지" class="signup-img" />
    <div class="signup-comments">User Sign Up</div>
    <form class="signup-form-area" @submit.prevent="signUp()">
      <SignupInput v-model="baseInput" v-model:touched="touched" />
      <button
        class="signup-btn"
        type="submit"
        :disabled="!usernameValid || !passwordValid || !checkPassword"
      >
        Sign Up
      </button>
    </form>
    <div class="signup-error">
      <p v-if="touched.username && !usernameValid">
        - Please enter a valid email address.
      </p>
      <p v-if="touched.password && !passwordValid">
        - Please enter a password with at least one letter, one number, and at
        least 4 characters in total.
      </p>
      <p v-if="passwordValid && !checkPassword">- Passwords do not match.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import authImg from "../../../assets/images/auth-img.png";
  import type { baseInputType, baseTouchType } from "../../../types";
  import {
    isValidEmail,
    isValidPassword,
    isSamePassword,
  } from "../../../utils/validators";
  import SignupInput from "./SignupInput.vue";
  import { signup } from "../../../apis/AuthApis";
  import { AxiosError } from "axios";
  import { reactive, watch, ref, computed } from "vue";

  const baseInput = ref<baseInputType>({
    username: "",
    password: "",
    password2: "",
  });

  const touched = ref<baseTouchType>({
    username: false,
    password: false,
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
      if (
        !usernameValid.value ||
        !passwordValid.value ||
        !checkPassword.value
      ) {
        return;
      }
      const res = await signup({
        username: baseInput.value.username,
        password: baseInput.value.password,
      });
      console.log(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorType = err.response?.data?.code;
        switch (errorType) {
          case "USER_EMAIL_DUPLICATED":
            alert("Duplicated Email");
            break;
          default:
            alert("Server Error");
        }
      }
    }
  };
</script>

<style>
  .signup-area {
    margin-top: 7rem;
    display: flex;
    width: 30%;
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
  .signup-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
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
</style>
