import { toast } from "react-toastify";

import TOAST_TYPES from "../constants/toast_types";

const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const toaster = {
  show: (message, type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        toast.success(message, defaultOptions);
        break;
      case TOAST_TYPES.ERROR:
        toast.error(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
        break;
    }
  },

  promiseShow: async (
    callback,
    {
      pending = "Please wait...",
      success = "Done",
      error = "Something went wrong",
      errorHandler = () => {},
    }
  ) => {
    return await toast.promise(
      callback(),
      {
        pending: pending,
        success: {
          render() {
            return success;
          },
        },
        error: {
          render({ data }) {
            errorHandler();
            return data.response.data ? data.response.data : error;
          },
        },
      },
      defaultOptions
    );
  },
};

export default toaster;
