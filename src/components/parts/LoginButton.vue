<template>
  <router-link to="/login" class="login-button">Login</router-link>
</template>

<style>
  .login-button {
    font-family: "Merriweather", serif;
    width: 4rem;
    height: 2rem;
    border: 1px solid white;
    font-size: 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 1rem;
    color: inherit;
    text-decoration: none;
  }
  .login-button:hover {
    background-color: white;
    color: black;
  }
</style>
