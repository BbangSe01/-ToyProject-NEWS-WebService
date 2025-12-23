import { useTokenDataStore } from "../../../../stores/tokenData";
import { useSearchDataStore } from "../../../../stores/searchData";
import { logout } from "../../../../apis/AuthApis";
import { openAlert } from "../../../../utils/alert";
import router from "../../../../router";

export const changeLoginState = async () => {
  const tokenStore = useTokenDataStore();
  const searchStore = useSearchDataStore();

  if (tokenStore.loginState) {
    // 로그아웃
    await logout();
    tokenStore.setAccessToken("");
    openAlert({
      title: "Success",
      text: "Logout!",
      icon: "success",
    });
    router.push({ name: "Headline" });
  } else {
    // 로그인
    router.push({ name: "Login" });
  }
  // 로그인/로그아웃 시, 검색어 초기화
  searchStore.resetSearchWord();
};
