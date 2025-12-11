<template>
  <div class="login-input-area">
    <input
      :value="modelValue.username"
      required
      placeholder="  Email"
      type="email"
      @input="(e) => updateField('username', e)"
    />
    <input
      :value="modelValue.password"
      required
      placeholder="  Password"
      type="password"
      @input="(e) => updateField('password', e)"
    />
  </div>
</template>

<script setup lang="ts">
  import type { baseInputType } from "../../../../types";
  const props = defineProps<{
    modelValue: Omit<baseInputType, "password2">;
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
  .login-input-area {
    display: flex;
    flex-direction: column;
  }
  .login-input-area input {
    width: 18rem;
    height: 2rem;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
</style>
