<template>
  <div class="dropdown-area" ref="dropdownRef">
    <div class="dropdown-area__button" @click="toggleDropdown">
      {{ list[modelValue] }}
    </div>
    <ul class="dropdown-area__menu" v-show="isOpen">
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

<style lang="scss">
  @import "../../../../assets/css/mixin.scss";
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
      top: 103%;
      opacity: 1;
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
    @include respond(mobile) {
      width: 4.5rem;
      height: 1.7rem;
      font-size: 0.6rem;
      margin-right: 1rem;
    }
    &__button {
      display: flex;
      padding: 10px;
      text-align: center;
      cursor: pointer;

      @include respond(mobile) {
        padding: 0px;
      }
    }

    &__menu {
      position: absolute;
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

      .dropdown-list {
        width: 100%;
        text-align: center;
        height: 1.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        cursor: pointer;
        @include respond(mobile) {
          height: 1rem;
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
        }
      }
      .dropdown-list:hover {
        background-color: #f3f4f6;
      }
    }
  }
</style>
