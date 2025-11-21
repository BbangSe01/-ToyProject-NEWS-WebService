<template>
  <div class="signup-input-area">
    <div class="username-line">
      <input
        :value="modelValue.username"
        class="signup-username-input"
        required
        placeholder="  Email"
        type="email"
        @input="(e) => updateField('username', e)"
      />
      <button class="dup-check-btn">중복확인</button>
    </div>
    <input
      :value="modelValue.password"
      class="signup-pw-input"
      required
      placeholder="  Password"
      type="password"
      @input="(e) => updateField('password', e)"
    />
    <input
      :value="modelValue.password2"
      class="signup-pw-input"
      required
      placeholder="  Confirm Password"
      type="password"
      @input="(e) => updateField('password2', e)"
    />
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  import type { baseInputType } from "../../../types";
  const props = defineProps<{
    modelValue: baseInputType;
  }>();

  const emit = defineEmits(["update:modelValue"]);

  const updateField = (key: keyof baseInputType, e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;

    emit("update:modelValue", {
      ...props.modelValue,
      [key]: newValue,
    });
  };
</script>

<style scoped>
  .signup-input-area {
    display: flex;
    flex-direction: column;
  }
  .username-line {
    display: flex;
  }
  .signup-username-input {
    width: 13rem;
    height: 2rem;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
  .signup-pw-input {
    width: 18rem;
    height: 2rem;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
  .dup-check-btn {
    width: 4.5rem;
    margin-left: 0.5rem;
    height: 2rem;
    font-size: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
  }
</style>
