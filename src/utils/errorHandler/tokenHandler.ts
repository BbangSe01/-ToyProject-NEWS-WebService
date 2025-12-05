import { openAlert } from "../alert";
import { useTokenDataStore } from "../../stores/tokenData";

export const tokenHandler = (errorType: string) => {
  const tokenStore = useTokenDataStore();
  switch (errorType) {
    case "TOKEN_EXPIRED":
      openAlert({
        title: "Error!",
        text: "Token has expired",
        icon: "error",
      });
      tokenStore.setAccessToken("");
      break;
    case "INVALID_TOKEN":
      openAlert({
        title: "Error!",
        text: "Token is invalid",
        icon: "error",
      });
      tokenStore.setAccessToken("");
      break;
    default:
      openAlert({
        title: "Error!",
        text: "Server Error",
        icon: "error",
      });
  }
};
