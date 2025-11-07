<template>
  <div class="card-box" @click="$emit('click', props.newsData)">
    <img
      :src="props.newsData.urlToImage || noImg"
      class="cardImg"
      alt="뉴스 이미지"
      @error="onImgError"
    />
    <div class="card-text-area">
      <h5 class="card-title">{{ props.newsData.title }}</h5>
      <p class="date-and-author">
        <small>{{ props.newsData.publishedAt }}</small>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  import noImg from "../../assets/images/Image_not_available.png";
  import type { NewsType } from "../../types";
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
    width: 60rem;
    height: 15rem;
    display: flex;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
  .cardImg {
    width: 25rem;
    height: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 10px 0 0 10px; /* 왼쪽 위, 왼쪽 아래만 둥글게 */
  }
  .card-text-area {
    width: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .card-title {
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  .date-and-author {
    display: flex;
    justify-content: flex-end; /* ✅ 오른쪽으로 정렬 */
    gap: 1rem; /* 날짜와 작성자 사이 여백 */
    margin-right: 1.5rem;
  }
</style>
