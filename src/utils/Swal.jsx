import react from "react";
import Swal from "sweetalert2";

export const SwalError = ({ message }) => {
  Swal.fire({
    icon: "error",
    title: message,
    text: "Please enter valid credentials",
    width: "400px",
    timer: 4500,
    timerProgressBar: true,
  });
};
