<template>
  <div class="dropdown-area" ref="dropdownRef">
    <div class="dropdown-button" @click="toggleDropdown">
      {{ list[modelValue] }}
    </div>
    <ul class="dropdown-menu" v-show="isOpen">
      <li
        v-for="(item, index) in props.list"
        class="dropdown-list"
        @click="selectCategory(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref } from "vue";
  const props = defineProps<{
    list: string[];
    modelValue: number;
  }>();
  const emits = defineEmits(["update:modelValue"]);
  // 드롭다운 열림/닫힘 상태
  const isOpen = ref(false);
  const dropdownRef = ref<HTMLElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (dropdownRef.value && !dropdownRef.value.contains(target)) {
      isOpen.value = false;
    }
  };
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const selectCategory = (idx: number) => {
    emits("update:modelValue", idx);
    isOpen.value = !isOpen.value;
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<style scoped>
  @keyframes slide-in {
    0% {
      top: 0%;
      opacity: 0;
    }
    40% {
      top: 40%;
      opacity: 0.4;
    }
    70% {
      top: 70%;
      opacity: 0.7;
    }
    100% {
      top: 101%;
      opacity: 1;
    }
  }

  @keyframes slide-out {
    0% {
      top: 101%;
      opacity: 1;
    }
    40% {
      top: 70%;
      opacity: 0.7;
    }
    70% {
      top: 40%;
      opacity: 0.4;
    }
    100% {
      top: 0%;
      opacity: 0;
    }
  }

  .dropdown-area {
    position: relative;
    width: 7.5rem;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: self-end;
  }

  .dropdown-button {
    display: flex;
    padding: 10px;
    text-align: center;
  }

  .dropdown-menu {
    position: absolute;
    top: 101%;
    width: 100%;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    list-style: none;
    margin: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0; /* ← 이것을 빠트려서 들여쓰기처럼 보임 */
    animation: slide-in 0.4s linear forwards;
  }

  .dropdown-list {
    width: 100%;
    text-align: center;
    height: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .dropdown-list:hover {
    background-color: #f3f4f6;
  }
</style>
