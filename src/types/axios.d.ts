import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    locale?: string; 
  }
}