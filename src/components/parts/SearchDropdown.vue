<template>
  <div class="dropdown-toggle" @click="toggleDropdown">
    {{ props.list[props.modelValue] }}
    <ul class="dropdown-menu" v-show="isOpen">
      <li
        v-for="(item, idx) in props.list"
        :key="item"
        @click="$emit('update:modelValue', idx)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const props = defineProps<{
    list: string[];
    modelValue: number;
  }>();
  const emits = defineEmits(["update:modelValue"]);
  // 드롭다운 열림/닫힘 상태
  const isOpen = ref(false);

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<style scoped>
  .dropdown-toggle {
    width: 120px;
    background-color: #f5f5f5;
    border-radius: 6px;
    padding: 10px;
    position: relative;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    user-select: none;
    border: 1px solid #ddd;
    align-self: flex-end;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    list-style: none;
    padding: 0.5rem 0;
    margin: 4px 0 0;
    width: 100%;
    z-index: 10;
  }

  .dropdown-menu li {
    padding: 0.5rem;
    cursor: pointer;
  }

  .dropdown-menu li:hover {
    background-color: #f3f4f6;
  }
</style>
