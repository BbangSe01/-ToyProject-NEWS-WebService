<template>
  <div class="card-box" @click="$emit('click', props.newsData)">
    <img
      :src="props.newsData.urlToImage || noImg"
      class="cardImg"
      alt="뉴스 이미지"
      @error="onImgError"
    />
    <div class="card-text-area">
      <div class="card-title">{{ props.newsData.title }}</div>
      <div class="card-date">
        <small>{{ props.newsData.publishedAt }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  import noImg from "../../../assets/images/Image_not_available.png";
  import type { NewsType } from "../../../types";
  const props = defineProps<{
    newsData: NewsType;
  }>();
  const emit = defineEmits(["click"]);

  const onImgError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    target.src = noImg;
  };
</script>

<style scoped>
  .card-box {
    width: 55rem;
    height: 10rem;
    display: flex;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
  .cardImg {
    width: 20rem;
    height: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 10px 0 0 10px; /* 왼쪽 위, 왼쪽 아래만 둥글게 */
  }
  .card-text-area {
    width: 35rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .card-title {
    font-family: "Montserrat", sans-serif;
    width: 95%;
    height: 80%;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
  }
  .card-date {
    display: flex;
    height: 20%;
    justify-content: flex-end; /* ✅ 오른쪽으로 정렬 */
    margin-right: 1.5rem;
    font-size: 0.9rem;
    padding-top: 1rem;
  }
</style>
