"use client";

import SFRequest from "./axios";
import { API_BASE_URL, TIME_OUT } from "../constant/index";
import localCache from "../utils/cache";

const request = new SFRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestInterceptor: (config):any => {
      const token = localCache.getCache("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default request;
