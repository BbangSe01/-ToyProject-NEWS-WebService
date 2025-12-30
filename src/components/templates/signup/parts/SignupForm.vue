<template>
  <div class="signup-area">
    <img :src="authImg" alt="인증 이미지" class="auth-img" />
    <div class="signup-area__comments">Sign Up</div>
    <form class="signup-area__form" @submit.prevent="signUp()">
      <SignupInput v-model="baseInput" v-model:touched="touched" />
      <button
        class="signup-btn"
        type="submit"
        :disabled="!usernameValid || !passwordValid || !checkPassword"
      >
        Sign Up
      </button>
    </form>
    <div class="signup-area__error">
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
  import authImg from "../../../../assets/images/auth-img.png";
  import type { baseInputType, baseTouchType } from "../../../../types";
  import {
    isValidEmail,
    isValidPassword,
    isSamePassword,
  } from "../../../../utils/validators";
  import SignupInput from "./SignupInput.vue";
  import { signup } from "../../../../apis/AuthApis";
  import { AxiosError } from "axios";
  import { useRouter } from "vue-router";
  import { openAlert } from "../../../../utils/alert";
  import { signupHandler } from "../../../../utils/errorHandler/signupHandler";
  import { ref, computed } from "vue";

  const router = useRouter();
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
      if (res.status === 201) {
        openAlert({
          title: "Success!",
          text: "Signup Success!",
          icon: "success",
        });
        router.push({ name: "Headline" });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorType = err.response?.data?.code;
        signupHandler(errorType);
      }
    }
  };
</script>

<style lang="scss">
  @use "../../../../assets/css/mixin.scss" as mixin;
  .signup-area {
    margin-top: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__comments {
      margin-top: 0.5rem;
      font-weight: bold;
      font-size: 2.5rem;
    }

    &__form {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;

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
        @include mixin.respond(mobile) {
          width: 17rem;
        }
      }
      .signup-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    &__error {
      display: flex;
      flex-direction: column;
      width: 19rem;

      p {
        color: red;
        font-size: 0.8rem;
        margin-bottom: -0.2rem;
      }
    }
    .auth-img {
      width: 150px;
      height: 150px;
    }
  }
</style>
