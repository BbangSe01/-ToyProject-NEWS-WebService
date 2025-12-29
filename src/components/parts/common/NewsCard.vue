<template>
  <div class="card-box" @click="$emit('click', props.newsData)">
    <img
      :src="props.newsData.urlToImage || noImg"
      class="card-box__img"
      alt="뉴스 이미지"
      @error="onImgError"
    />
    <div class="card-box__text-area">
      <div class="card-box__text-area__title">{{ props.newsData.title }}</div>
      <div class="card-box__text-area__date">
        <small>{{ props.newsData.publishedAt }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import noImg from "../../../assets/images/Image_not_available.png";
  import type { useNewsType } from "../../../types";
  const props = defineProps<{
    newsData: useNewsType;
  }>();
  const emit = defineEmits(["click"]);

  const onImgError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    target.src = noImg;
  };
</script>

<style lang="scss">
  @import "../../../assets/css/mixin.scss";
  .card-box {
    width: 55rem;
    height: 10rem;
    display: flex;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    cursor: pointer;

    @include respond(mobile) {
      width: 18rem;
      height: 5rem;
    }
    @include respond(tablet) {
      width: 40rem;
      height: 8rem;
    }

    &__img {
      width: 20rem;
      height: 100%;
      border: 1px solid #e2e2e2;
      border-radius: 10px 0 0 10px; /* 왼쪽 위, 왼쪽 아래만 둥글게 */

      @include respond(mobile) {
        width: 7rem;
      }
      @include respond(tablet) {
        width: 15rem;
      }
    }

    &__text-area {
      width: 35rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      @include respond(mobile) {
        width: 10rem;
      }
      @include respond(tablet) {
        width: 25rem;
      }

      &__title {
        font-family: "Montserrat", sans-serif;
        width: 95%;
        height: 80%;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;

        @include respond(mobile) {
          font-size: 0.5rem;
          font-weight: bold;
          padding-left: 0.5rem;
        }
        @include respond(tablet) {
          font-size: 1rem;
        }
      }
      &__date {
        display: flex;
        height: 20%;
        justify-content: flex-end; /* ✅ 오른쪽으로 정렬 */
        margin-right: 1.5rem;
        font-size: 0.9rem;
        padding-top: 1rem;

        @include respond(mobile) {
          font-size: 0.4rem;
          margin-right: 0rem;
        }
        @include respond(tablet) {
          font-size: 0.8rem;
          margin-right: 1rem;
        }
      }
    }
  }
</style>
