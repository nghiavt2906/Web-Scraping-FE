import axios from "../../config/axios";

import * as types from "../action_types/user";

export const loginRequest = (data) => async (dispatch) => {
  const response = await axios.post("/auth/login", data);
  return dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
};

export const signupRequest = (data, navigate) => async (dispatch) => {
  await axios.post("/auth/signup", data);
  navigate("/login", { replace: true });
};
