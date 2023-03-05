import { axiosPrivate } from "../../config/axios";
import toaster from "../../config/toaster";

import * as types from "../action_types/user";

export const uploadFileRequest = (file) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await toaster.promiseShow(
    () =>
      axiosPrivate.post("/reports/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      pending: "Uploading...",
      success: "File uploaded successfully!",
    }
  );
  dispatch({ type: types.FILE_SUBMIT_SUCCESS, payload: response.data });
};
