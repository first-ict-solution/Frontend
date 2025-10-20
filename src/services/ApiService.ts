import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000",
  timeout: 500000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const responseBody = (response: AxiosResponse) => response;

const ApiService = {
  get: (url: string, config?: AxiosRequestConfig) =>
    instance.get(url, config).then(responseBody),

  post: (url: string, body: object, headers?: { [key: string]: string }) =>
    instance.post(url, body, { headers: headers }).then(responseBody),

  put: (url: string, body: object) =>
    instance.put(url, body).then(responseBody),

  patch: (url: string, body: object) =>
    instance.patch(url, body).then(responseBody),

  delete: (url: string) => instance.delete(url).then(responseBody),
};

export default ApiService;
