/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    custom?: {
      refresh?: boolean;
      retry?: boolean;
    };
  }
}
