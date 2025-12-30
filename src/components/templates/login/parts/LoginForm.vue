<template>
  <div class="login-area">
    <img :src="authImg" alt="인증 이미지" class="auth-img" />
    <div class="login-area__comments">Login</div>
    <form class="login-area__form" @submit.prevent="logIn()">
      <LoginInput v-model="baseInput" />
      <button class="login-btn" type="submit">LogIn</button>
    </form>
    <div class="login-area__go-signup">
      <p>Don't have an account?</p>
      <router-link to="/signup" class="go-signup-btn">Sign up</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import authImg from "../../../../assets/images/auth-img.png";
  import type { baseInputType } from "../../../../types";
  import LoginInput from "./LoginInput.vue";
  import { login } from "../../../../apis/AuthApis";
  import { useTokenDataStore } from "../../../../stores/tokenData";
  import { useRouter } from "vue-router";
  import { openAlert } from "../../../../utils/alert";
  import { ref } from "vue";

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
      tokenStore.setAccessToken(res.data.accessToken);
      openAlert({
        title: "Success",
        text: "Login!",
        icon: "success",
      });
      router.push({ name: "Headline" });
    } catch (err) {
      openAlert({
        title: "Error!",
        text: "The username or password you entered is incorrect.",
        icon: "error",
      });
    }
  };
</script>

<style lang="scss">
  @use "../../../../assets/css/mixin.scss" as mixin;
  .login-area {
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
        @include mixin.respond(mobile) {
          width: 17rem;
        }
      }
    }

    &__go-signup {
      margin-top: 1.5rem;
      border-top: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 18rem;
      font-size: 0.9rem;

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
    }

    .auth-img {
      width: 200px;
      height: 200px;
    }
  }
</style>
