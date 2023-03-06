import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER_END_POINT}/api`;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const configureAxiosPrivate = (accessToken, refreshToken) => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;

        const newAccessToken = await refreshToken();
        if (!newAccessToken) return Promise.reject(error);

        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }

      return Promise.reject(error);
    }
  );
};
