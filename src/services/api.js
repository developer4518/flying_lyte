import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach access token to every request
// privateApi.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;

//     console.log("Authorization token:", token);

//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Handle expired access tokens (optional refresh flow)
privateApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      const { refreshToken, setToken, logout } = useAuthStore.getState();

      /*
       * User logged in hi nahi hai.
       *
       * Refresh API call mat karo.
       * Original 401 PreBookLoader ko return karo.
       */
      if (!refreshToken) {
        logout();

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const res = await publicApi.post(
          "/api/auth/token/refresh/",
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken =
          res.data?.data?.access ||
          res.data?.access;

        if (!newAccessToken) {
          throw new Error("New access token missing");
        }

        setToken(newAccessToken);

        originalRequest.headers =
          originalRequest.headers || {};

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return privateApi(originalRequest);
      } catch (refreshError) {
        console.log(
          "TOKEN REFRESH FAILED:",
          refreshError?.response?.data || refreshError,
        );

        logout();

        /*
         * IMPORTANT:
         * refresh ka 400 return nahi karna.
         * Original 401 return karo.
         *
         * Isse PreBookLoader identify karega
         * ki login required hai.
         */
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);