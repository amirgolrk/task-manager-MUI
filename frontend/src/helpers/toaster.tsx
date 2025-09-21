import { toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toaster = (
  message: unknown,
  type: "success" | "error" | "info" | 'warn',
  timer: number
): void => {
  toast[type](message, {
    position: "top-left",
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  } as ToastOptions);
};

export default toaster;