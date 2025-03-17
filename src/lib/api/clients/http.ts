import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { getCookie } from "cookies-next";
import apiConfig from "@/config/services/api-config";
import { useApiErrorHandler } from "@/lib/useApiErrorHandler";

let instance: AxiosInstance | null = null;

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedRequest[] = [];
const handleError = useApiErrorHandler();

/**
 * Processes the queue of failed requests by either resolving them with a new token
 * or rejecting them with an error.
 *
 * @param error - The error to reject the promises with, if any.
 * @param token - The new token to resolve the promises with, if any.
 */
const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

export const Http = {
  /**
   * Creates a new Axios instance with the specified base URL.
   *
   * @param baseUrl - The base URL for the Axios instance.
   * @returns The created Axios instance.
   */
  createInstance: (baseUrl: string): AxiosInstance => {
    instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      async (config) => {
        const accessToken = getCookie("token");
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          processQueue(new Error("Unauthorized"));
          return Promise.reject(error);
        }

        handleError(error);
        return Promise.reject(error);
      },
    );

    return instance;
  },

  /**
   * Sets a custom header for the Axios instance.
   *
   * @param name - The name of the header.
   * @param value - The value of the header.
   */
  setHeader: (name: string, value: string) => {
    if (instance) {
      instance.defaults.headers.common[name] = value;
    }
  },
};

export const http = {
  get: (url: string, config?: AxiosRequestConfig) => instance!.get(url, config),
  post: (url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance!.post(url, data, config),
  put: (url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance!.put(url, data, config),
  patch: (url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance!.patch(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) =>
    instance!.delete(url, config),
};

/**
 * The default Axios instance configured with the base URL from the config.
 */
export const Api = Http.createInstance(apiConfig.API_HOST);
