// http/setupInterceptors.ts
import { attachAuthToken } from "./interceptors/authRequest.interceptor";
import { refreshTokenInterceptor } from "./interceptors/refreshToken.interceptor";

export const setupInterceptors = () => {
  attachAuthToken();
  refreshTokenInterceptor();
};
