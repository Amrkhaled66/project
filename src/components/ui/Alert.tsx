import Swal from "sweetalert2";

type AlertIcon = "success" | "error" | "warning" | "info" | "question";

interface AlertProps {
  title: string;
  text: string;
  icon: AlertIcon;
  confirmButtonText: string;
}

const Alert = ({ title, text, icon, confirmButtonText }: AlertProps) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#002051",
    confirmButtonText,
  });
};

export default Alert;
