<template>
  <div class="mobile-dropdown" ref="dropdownRef">
    <img :src="DropdownImg" class="mobile-dropdown__button" @click="toggleDropdown"></img>
    <ul class="mobile-dropdown__menu" v-show="isOpen">
      <li
      v-if="tokenStore.loginState"
        v-for="(item, index) in dropdownMenu.logoutMenu"
        class="dropdown-list"
        @click="selectOption(index)"
      >
        {{ item }}
      </li>
      <li
      v-else
        v-for="(item, index) in dropdownMenu.loginMenu"
        class="dropdown-list"
        @click="selectOption(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
  import { useTokenDataStore } from "../../../../stores/tokenData";
  import DropdownImg from "../../../../assets/images/dropdown-img.png"
  import { changeLoginState } from "../logic/changeLoginState";
  import { goToFavPage } from "../logic/goToFavPage";
  const tokenStore = useTokenDataStore();

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

const dropdownMenu = reactive({
    loginMenu: ["Login", "Bookmarks"],
    logoutMenu: ["Logout", "Bookmarks"],
    routes: ["Login", "Favorites"],
    index: 0

})
  const selectOption = (idx: number) => {
    idx=== 0 ? changeLoginState() : goToFavPage();
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<style lang="scss">
  @use "../../../../assets/css/mixin.scss" as mixin;
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
  .mobile-dropdown {
    display:none;
    @include mixin.respond(mobile) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width:35px;
        height:35px;
        margin-left:0.2rem;
      }

    &__button {
      width:100%;
      height:100%;
      cursor: pointer;
    }

    &__menu {
      position: absolute;
      bottom:0;
      width: 6rem;
      margin-right: 2.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      list-style: none;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0; /* ← 이것을 빠트려서 들여쓰기처럼 보임 */
      animation: slide-in 0.4s linear forwards;

      .dropdown-list {
        font-family: "Montserrat", sans-serif;
        background-color: white;
        width: 100%;
        color:black;
        font-size:0.9rem;
        text-align: center;
        height: 1.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        cursor: pointer;
      }
      .dropdown-list:hover {
        background-color: #f3f4f6;
      }
    }
  }
</style>
