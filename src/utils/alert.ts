import Swal from "sweetalert2";
import type { SweetAlertIcon } from "sweetalert2";
export const openAlert = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: SweetAlertIcon;
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "Ok",
  });
};
