// import axios from 'axios';

// const axiosInstance = axios.create()

// const getLocale = () => {
//   return localStorage.getItem('locale') || 'en';
// };

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const locale = getLocale();
//     config.headers['Accept-Language'] = locale;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// export const setLocale = (locale: string) => {
//   localStorage.setItem('locale', locale);
// };

import axios from "axios";

const axiosInstance = axios.create();

const getLocale = () => {
  if (typeof window !== "undefined") {
    // Client-side: get locale from localStorage
    return localStorage.getItem("locale") || "en";
  } else {
    // Server-side: get locale from Next.js headers or context
    // Use `next/headers` for App Router or `next/router` for Pages Router
    const { headers } = require("next/headers");
    return headers().get("accept-language") || "en";
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const locale = getLocale();
    config.headers["Accept-Language"] = locale;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const setLocale = (locale: string) => {
  localStorage.setItem("locale", locale);
};
