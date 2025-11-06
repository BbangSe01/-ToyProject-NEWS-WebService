<template>
  <div class="modal-overlay">
    <div class="modal-area">
      <img
        src="../../assets//images/close-btn.png"
        alt="닫기 버튼"
        class="close-btn"
        @click="$emit('close', false)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from "vue";

  const emit = defineEmits(["close"]);
</script>

<style>
  .modal-overlay {
    position: fixed;
    inset: 0; /* top, right, bottom, left = 0 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-area {
    position: relative;
    min-width: 900px;
    min-height: 550px;
    background-color: white;
    color: black;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
  }
  .close-btn {
    position: absolute; /*모달 내부 우측 상단 */
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
</style>
