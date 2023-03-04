import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../config/axios";

import * as types from "../store/action_types/user";

const CheckAuth = ({ isProtectedRoute }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axiosPrivate.get("/auth/refresh");
        dispatch({ type: types.REFRESH_TOKEN, payload: response.data });

        if (!isProtectedRoute) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log(error);
        if (isProtectedRoute && error.response.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    };

    if (!user.authenticated) {
      refreshToken();
    }
  }, []);

  return <Outlet />;
};

export default CheckAuth;
