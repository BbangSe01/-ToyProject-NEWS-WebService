import { useToast } from "vue-toast-notification";

const $toast = useToast();

export const warningToast = (message: string) => {
  return $toast.open({
    message: message,
    type: "warning",
    duration: 3000,
    position: "top-right",
  });
};
