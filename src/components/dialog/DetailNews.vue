<template>
  <div class="modal-overlay">
    <div class="modal-area">
      <img
        src="../../assets//images/close-btn.png"
        alt="닫기 버튼"
        class="close-btn"
        @click="$emit('close', false)"
      />
      <div class="news-content-area">
        <div class="news-title">{{ detailData.title }}</div>
        <div class="author-and-date">
          <div class="news-author">{{ detailData.author }}</div>
          <div v-if="detailData.author" class="blank"></div>
          <div class="news-date">{{ detailData.publishedAt }}</div>
        </div>
        <div class="img-box">
          <img
            :src="detailData.urlToImage as string || noImg"
            alt="기사 이미지"
            class="news-img"
            @error="onImgError"
          />
        </div>
        <div class="news-description">
          {{
            detailData.description || "Summary information is not available."
          }}
        </div>
        <div class="button-box" @click="goToArticle()">
          <p class="go-article-btn">View Full Article</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from "vue";
  import { useNewsDataStore } from "../../stores/newsData";
  import noImg from "../../assets/images/Image_not_available.png";
  const emit = defineEmits(["close"]);

  const newsDataStore = useNewsDataStore();
  const detailData = newsDataStore.detailData;

  const goToArticle = () => {
    window.open(`${detailData.url}`, "_blank");
  };

  const onImgError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    target.src = noImg;
  };
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&display=swap");

  @keyframes showDetailModal {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-overlay {
    position: fixed;
    inset: 0; /* top, right, bottom, left = 0 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-area {
    position: relative;
    width: 900px;
    height: 600px;
    background-color: white;
    color: black;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    overflow: auto;
    animation: showDetailModal 0.5s linear;
  }
  .close-btn {
    position: absolute; /*모달 내부 우측 상단 */
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  .news-content-area {
    width: 80%;
    /* background-color: black; */
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    font-family: "Merriweather", serif;
  }
  .news-title {
    font-family: "Montserrat", sans-serif;
    font-size: 1.7rem;
    padding-top: 1rem;
  }
  .author-and-date {
    display: flex;
    margin-top: 1rem;
    color: gray;
  }
  .blank {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .img-box {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .news-img {
    width: 85%;
  }
  .news-description {
    margin-top: 2rem;
  }
  .button-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .go-article-btn {
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: black;
    color: white;
    cursor: pointer;
  }
</style>
