import { useTokenDataStore } from "../../../../stores/tokenData";
import router from "../../../../router";
import { warningToast } from "../../../../utils/warningtoast";

export const goToFavPage = () => {
  const tokenStore = useTokenDataStore();
  if (tokenStore.loginState) {
    router.push({ name: "Favorites" });
  } else {
    warningToast("Available after logging in.");
  }
};
