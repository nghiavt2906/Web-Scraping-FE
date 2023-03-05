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

  promiseShow: async (
    callback,
    {
      pending = "Please wait...",
      success = "Done",
      error = "Something went wrong",
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
            return data.response.data ? data.response.data : error;
          },
        },
      },
      defaultOptions
    );
  },
};

export default toaster;
