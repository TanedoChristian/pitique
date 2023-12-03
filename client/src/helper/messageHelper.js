import Swal from "sweetalert2";

export const showErrorMessage = (message) => {
  Swal.fire("Error!", message, "warning");
};

export const showSuccessMessage = (title, message) => {
  Swal.fire(title, message, "success");
};

export const showLoadingMessage = (message) => {
  Swal.fire({
    title: message,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const showInfoMessage = (message) => {
  Swal.fire("Info", message, "info");
};
