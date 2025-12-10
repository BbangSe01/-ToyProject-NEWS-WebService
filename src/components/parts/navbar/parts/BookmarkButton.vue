<template>
  <button class="bookmark-btn">
    <img :src="bookmarkImg" alt="북마크" class="bookmark-img" />
    Bookmarks
  </button>
</template>

<script setup lang="ts">
  import bookmarkImg from "../../../../assets/images/bookmark-btn-img.png";
</script>

<style>
  .bookmark-btn {
    font-family: "Merriweather", serif;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 0.5rem;
    background-color: white;
    color: black;
    border: 1px solid white;
    border-radius: 10px;
  }
  .bookmark-img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
</style>
