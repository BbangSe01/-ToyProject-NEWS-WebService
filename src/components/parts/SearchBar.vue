<template>
  <form class="search-area">
    <input type="search" placeholder="  Search News" class="search-input" />
    <button type="submit" class="search-btn">Search</button>
  </form>
</template>

<style scoped>
  .search-area {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-family: "Merriweather", serif;
  }
  .search-input {
    width: 300px;
    height: 30px;
  }

  .search-btn {
    width: 80px;
    height: 30px;
  }
</style>
