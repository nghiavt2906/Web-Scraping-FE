import axios from "../../config/axios";
import toaster from "../../config/toaster";

import * as types from "../action_types/user";

export const loginRequest = (data) => async (dispatch) => {
  const response = await toaster.promiseShow(
    () => axios.post("/auth/login", data),
    {
      success: "Logged in sucessfully 👌",
    }
  );
  return dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
};

export const signupRequest = (data, navigate) => async (dispatch) => {
  await toaster.promiseShow(() => axios.post("/auth/signup", data), {
    success: "Signed up sucessfully 👌",
  });
  navigate("/login", { replace: true });
};
