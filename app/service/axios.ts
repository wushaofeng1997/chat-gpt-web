"use client";

import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

interface SFRequestConfig extends AxiosRequestConfig {
  interceptorHooks?: InterceptorHooks;
}

interface SFData<T> {
  data: T;
  returnCode: string;
  success: boolean;
}

class SFRequest {
  config: AxiosRequestConfig;
  interceptorHooks?: InterceptorHooks;
  instance: AxiosInstance;

  constructor(options: SFRequestConfig) {
    this.config = options;
    this.interceptorHooks = options.interceptorHooks;
    this.instance = axios.create(options);

    this.setupInterceptor()
  }

  setupInterceptor(): void {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    // this.instance.interceptors.request.use((config) => {
    //   if (this.showLoading) {
    //     this.loading = ElLoading.service({
    //       lock: true,
    //       text: 'Loading',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, 0.7)'
    //     })
    //   }
    //   return config
    // })

    // this.instance.interceptors.response.use(
    //   (res) => {
    //     this.loading?.close()
    //     return res
    //   },
    //   (err) => {
    //     this.loading?.close()
    //     return err
    //   }
    // )
  }

  request<T = any>(config: SFRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, SFData<T>>(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: SFRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T = any>(config: SFRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T = any>(config: SFRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: SFRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default SFRequest;
