import axios, { type AxiosInstance } from "axios";

type InterceptorFn = (client: AxiosInstance) => void;

export function createAxiosClient(
  baseURL: string,
  interceptors: InterceptorFn[] = []
): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 15000,
    withCredentials: true,
  });

  interceptors.forEach((attach) => attach(client));

  return client;
}
