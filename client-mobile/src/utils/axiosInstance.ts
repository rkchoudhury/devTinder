import axios, { AxiosError } from "axios";
import { router } from "expo-router";

import { BASE_URL } from "../utils/apiConfig";
import { store } from "../redux/store";
import { removeUser, updateAccessToken } from "../redux/slices/userSlice";
import { getRefreshToken, clearRefreshToken } from "./secureStorage";
import { logoutUser } from "../services/authService";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // web support
  headers: {
    "X-Client-Type": "mobile",
  },
});

api.interceptors.request.use(config => {
  const accessToken = store.getState().user.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw error;

        const { data } = await api.post("/auth/refresh", {
          refreshToken,
        });

        store.dispatch(updateAccessToken(data.accessToken));
        // await saveRefreshToken(data.refreshToken);

        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        const axiosError = err as AxiosError;
        processQueue(err, null);

        // Handling refresh token expiry
        if (axiosError.response?.data?.code === "REFRESH_TOKEN_EXPIRED") {
          const userId = store.getState().user.data?._id;
          await clearRefreshToken();
          await logoutUser(userId ?? '');
          store.dispatch(removeUser());
          router.replace('/');
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
