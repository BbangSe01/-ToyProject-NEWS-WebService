<template>
  <div class="navbar">News</div>
</template>

<script>
  import "../../style.css";
</script>

<style scoped>
  @font-face {
    font-family: "Continuous";
    src: url("../../assets/fonts/continuous.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  .navbar {
    font-family: "Continuous", serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    z-index: 10;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 55px;
  }
</style>
