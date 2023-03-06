import { useDispatch } from "react-redux";

import { axiosPrivate } from "../config/axios";

import * as types from "../store/action_types/user";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      const response = await axiosPrivate.get("/auth/refresh");
      dispatch({ type: types.REFRESH_TOKEN, payload: response.data });
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
      return null;
    }
  };

  return refreshToken;
};

export default useRefreshToken;
