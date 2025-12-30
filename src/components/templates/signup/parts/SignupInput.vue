<template>
  <div class="signup-input-area">
    <input
      :value="modelValue.username"
      required
      placeholder="  Email"
      type="email"
      @input="(e) => updateField('username', e)"
      @blur="updateTouched('username')"
    />
    <input
      :value="modelValue.password"
      required
      placeholder="  Password"
      type="password"
      @input="(e) => updateField('password', e)"
      @blur="updateTouched('password')"
    />
    <input
      :value="modelValue.password2"
      required
      placeholder="  Confirm Password"
      type="password"
      @input="(e) => updateField('password2', e)"
    />
  </div>
</template>

<script setup lang="ts">
  import type { baseInputType, baseTouchType } from "../../../../types";
  const props = defineProps<{
    modelValue: baseInputType;
    touched: baseTouchType;
  }>();

  const emit = defineEmits(["update:modelValue", "update:touched"]);

  const updateField = (key: keyof baseInputType, e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;

    emit("update:modelValue", {
      ...props.modelValue,
      [key]: newValue,
    });
  };

  const updateTouched = (key: keyof baseInputType) => {
    emit("update:touched", {
      ...props.touched,
      [key]: true,
    });
  };
</script>

<style lang="scss">
  @use "../../../../assets/css/mixin.scss" as mixin;
  .signup-input-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      width: 18rem;
      height: 2rem;
      border: 2px solid black;
      border-radius: 10px;
      margin-bottom: 0.5rem;
      @include mixin.respond(mobile) {
        width: 17rem;
      }
    }
  }
</style>
