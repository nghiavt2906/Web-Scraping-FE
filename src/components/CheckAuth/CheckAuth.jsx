import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import NavBar from "../NavBar/NavBar";

import { axiosPrivate, configureAxiosPrivate } from "../../config/axios";
import useRefreshToken from "../../hooks/useRefreshToken";

import * as types from "../../store/action_types/user";

const CheckAuth = ({ isProtectedRoute }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const refreshToken = useRefreshToken();
  configureAxiosPrivate(user.accessToken, refreshToken);

  useEffect(() => {
    const tryRefreshToken = async () => {
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
      tryRefreshToken();
    }
  }, []);

  return (
    <>
      {isProtectedRoute && <NavBar />}
      <Outlet />
    </>
  );
};

export default CheckAuth;
