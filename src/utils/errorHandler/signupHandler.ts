import { openAlert } from "../alert";

export const signupHandler = (errorType: string) => {
  switch (errorType) {
    case "USER_EMAIL_DUPLICATED":
      openAlert({
        title: "Error!",
        text: "Duplicated Email",
        icon: "error",
      });
      break;
    default:
      openAlert({
        title: "Error!",
        text: "Server Error",
        icon: "error",
      });
  }
};
