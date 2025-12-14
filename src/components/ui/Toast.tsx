import Swal from "sweetalert2";
import { SweetAlertPosition } from "sweetalert2";
import { SweetAlertIcon } from "sweetalert2";

export default function Toast(
  title: string,
  icon: SweetAlertIcon,
  background?: string,
  position?: SweetAlertPosition,
) {
  return Swal.mixin({
    toast: true,
    position: position || "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
      popup: "custom-toast",
    },
  }).fire({
    icon,
    title: title,
    background,
  });
}
