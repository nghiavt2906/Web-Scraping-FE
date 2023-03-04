import { toast } from "react-toastify";

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
      case "SUCCESS":
        toast.success(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
        break;
    }
  },

  promiseShow: async (callback, messages) => {
    return await toast.promise(
      callback(),
      {
        pending: "Please wait...",
        success: {
          render() {
            return messages.success;
          },
        },
        error: {
          render({ data }) {
            return data.response.data;
          },
        },
      },
      defaultOptions
    );
  },
};

export default toaster;
