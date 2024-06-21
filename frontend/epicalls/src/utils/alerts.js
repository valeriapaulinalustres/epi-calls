import Swal from "sweetalert2";


export const toastAlert = (icon, message) => {
  Swal.fire({
    toast: true,
    icon, //Expected "success", "error", "warning", "info" or "question"
    title: message,
    animation: false,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const errorAlert = (text) => {
    Swal.fire({
      icon: "error",
      iconColor: "red",
      title: text,
      showConfirmButton: false,
    
      showCancelButton: true,
      cancelButtonText: "OK",
      cancelButtonColor: "grey",
    })
  
  }

  export const errorFetchAlert = (text) => {
    Swal.fire({
      icon: "error",
      iconColor: "red",
      title: text,
      // text: 'Ask us on dirask',
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "red",
     
    })
 
  }

  export const infoAlert = (icon, text) => {
    Swal.fire({
      icon: icon,
      iconColor: "red",
      title: text,
      showConfirmButton: false,
    
      showCancelButton: true,
      cancelButtonText: "OK",
      cancelButtonColor: "grey",
    })
  
  }

