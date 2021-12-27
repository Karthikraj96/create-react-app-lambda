import swal from "sweetalert2";

const alerSwal = (icon, title, text, timer = 0) => {
  if (timer === 0) {
    swal.fire({
      type: icon,
      title: title,

      text: text,
    });
  } else {
    swal.fire({
      type: icon,
      title: title,
      showConfirmButton: false,
      timer: timer,
    });
  }
};

export { alerSwal };
