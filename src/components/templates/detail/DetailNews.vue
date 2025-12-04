<template>
  <div class="modal-overlay">
    <div class="modal-area">
      <img
        src="../../../assets//images/close-btn.png"
        alt="닫기 버튼"
        class="close-btn"
        @click="$emit('close', false)"
      />
      <div class="news-content-area" id="news-content-area">
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
        <div class="button-area">
          <button class="each-btn" @click="goToArticle">
            View Full Article
          </button>
          <button
            v-if="!summaryState.isFetching"
            class="each-btn"
            @click="goToSummary"
          >
            View summary
          </button>
          <LoadingSpinner v-else />
        </div>
        <p class="btn-guide" v-if="!tokenStore.loginState">
          ☝️ The summary feature is available after logging in.
        </p>
        <SummaryArea
          v-if="summaryState.isSuccess"
          :content="summaryState.content"
        ></SummaryArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits, reactive, nextTick, ref, watch } from "vue";
  import { useNewsDataStore } from "../../../stores/newsData";
  import { useTokenDataStore } from "../../../stores/tokenData";
  import { getSummaryNews } from "../../../apis/NewsApis";
  import noImg from "../../../assets/images/Image_not_available.png";
  import LoadingSpinner from "../../parts/common/LoadingSpinner.vue";
  import SummaryArea from "./parts/SummaryArea.vue";
  const emit = defineEmits(["close"]);
  const isOpen = ref(false);

  watch(
    isOpen,
    (newVal, oldVal) => {
      console.log("isOpen", newVal);
    },
    { immediate: true }
  );
  const newsDataStore = useNewsDataStore();
  const tokenStore = useTokenDataStore();
  const detailData = newsDataStore.detailData;

  const goToArticle = () => {
    window.open(`${detailData.url}`, "_blank");
  };

  const summaryState = reactive({
    content: "",
    isFetching: false,
    isSuccess: false,
  });
  const goToSummary = async () => {
    if (!tokenStore.loginState || summaryState.isSuccess) {
      // 미로그인 시, api 호출 x
      // 한번 호출 성공 시에도 재호출 x
      return;
    }
    try {
      summaryState.isFetching = true;
      const res = await getSummaryNews(detailData.url);
      summaryState.content = res.data.content;
      summaryState.isSuccess = true;
      console.log("뉴스 요약", res);
    } catch (err) {
      console.error(err);
    } finally {
      summaryState.isFetching = false;
      // 요약 구간이 추가되면서 dom이 새로 기다려지는 과정을 기다린 후,scrollIntoView 수행
      await nextTick();
      const element = document.getElementById(
        "news-content-area"
      ) as HTMLElement;
      console.log(element);
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
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
    background-color: rgba(0, 0, 0, 0.4);
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
  .button-area {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
  }
  .button-area button:nth-child(2) {
    background-color: #1e90ff;
  }
  .each-btn {
    width: 9rem;
    height: 3rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: black;
    color: white;
    margin-right: 1rem;
    font-size: 1rem;
    padding: 0.7rem;
    cursor: pointer;
  }
  .btn-guide {
    align-self: center;
    font-size: 0.9rem;
    color: red;
    opacity: 0.7;
    margin-top: -0.5rem;
  }
</style>
