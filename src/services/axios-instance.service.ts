import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let locale: string;

    if (typeof window !== "undefined") {
      locale = localStorage.getItem("locale") || "en";
    } else {
      locale = config.locale || "en";
    }

    config.headers["Accept-Language"] = locale;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

export const setLocale = (locale: string) => {
  localStorage.setItem("locale", locale);
};

// import axios, { AxiosError,AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// class ApiClient {
//   private instance: AxiosInstance;

//   constructor(
//     baseURL: string,
//     headers: Record<string, string> = { 'Content-Type': 'application/json' },
//     timeout: number = 10000,
//     customInterceptors?: {
//       request?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
//       response?: (response: AxiosResponse) => AxiosResponse;
//       error?: (error: AxiosError) => Promise<any>;
//     }
//   ) {
//     this.instance = axios.create({
//       baseURL,
//       headers: new AxiosHeaders(headers),
//       timeout,
//     });

//     this.instance.interceptors.request.use(
//       (config: InternalAxiosRequestConfig) => {
//         let locale: string;

//         if (typeof window !== 'undefined') {
//           locale = localStorage.getItem('locale') || 'en';
//         } else {
//           locale = config.locale || 'en';
//         }

//         config.headers = new AxiosHeaders({
//           ...config.headers.toJSON(),
//           'Accept-Language': locale,
//         });

//         return customInterceptors?.request ? customInterceptors.request(config) : config;
//       },
//       (error) => Promise.reject(error)
//     );

//     this.instance.interceptors.response.use(
//       (response) => {
//         return customInterceptors?.response
//           ? customInterceptors.response(response)
//           : response;
//       },
//       (error: AxiosError) => {
//         if (error.response?.status === 401) {
//           console.error('Unauthorized access - redirecting to login.');
//         }
//         return customInterceptors?.error
//           ? customInterceptors.error(error)
//           : Promise.reject(error);
//       }
//     );
//   }

//   async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
//     const response = await this.instance.get<T>(url, config);
//     return response.data;
//   }

//   async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
//     const response = await this.instance.post<T>(url, data, config);
//     return response.data;
//   }

//   async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
//     const response = await this.instance.put<T>(url, data, config);
//     return response.data;
//   }

//   async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
//     const response = await this.instance.delete<T>(url, config);
//     return response.data;
//   }
// }

// const defaultApiClient = new ApiClient(
//   process.env.NEXT_PUBLIC_API_URL || '',
//   { 'Content-Type': 'application/json' },
//   10000
// );

// const customApiClient = new ApiClient(
//   'https://custom-api.com',
//   { 'Content-Type': 'application/xml' },
//   5000,
//   {
//     request: (config) => {
//       return config;
//     },
//     response: (response) => {
//       return response;
//     },
//   }
// );

// export { defaultApiClient, customApiClient };

// export const setLocale = (locale: string) => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('locale', locale);
//   }
// };
