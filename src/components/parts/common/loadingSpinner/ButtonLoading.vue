<template>
  <div class="loader-box">
    <div class="custom-loader"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .loader-box {
    width: 9rem;
    height: 3rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    color: white;
    margin-right: 1rem;
    background-color: #1e90ff;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .custom-loader {
    --d: 12px;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    color: white;
    box-shadow: calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
      calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 0.5px,
      calc(0 * var(--d)) calc(1 * var(--d)) 0 1px,
      calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 1.5px,
      calc(-1 * var(--d)) calc(0 * var(--d)) 0 2px,
      calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 2.5px,
      calc(0 * var(--d)) calc(-1 * var(--d)) 0 3px;
    animation: s7 1s infinite steps(8);
  }

  @keyframes s7 {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
