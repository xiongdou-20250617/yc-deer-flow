/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-11 19:48:55
 * @LastEditors: xiongdou-20250617 1126927171@qq.com
 * @LastEditTime: 2025-06-24 16:48:45
 * @FilePath: \web\src\lib\apiClient.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { storage } from './storage';

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        // debugger;
        return {
          ...config,
          headers: {
            ...config.headers,
            'accept': 'application/json, text/plain, */*',
            'X-App': process.env.NEXT_PUBLIC_XAPP,
            'x-authenticator': 'basic',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        };
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
        (response: AxiosResponse) => {
          console.log('API Response:', response); // 调试日志
          
          // 2xx 状态码视为成功
          if (response.status >= 200 && response.status < 300) {
            return response.data;
          }
          
          // 非2xx状态码视为错误
          const error = {
            message: `请求失败，状态码: ${response.status}`,
            status: response.status,
            data: response.data,
            isApiError: true
          };
          return Promise.reject(error);
        },
        (error) => {
          console.error('API Error:', error); // 错误日志
          
          // 处理网络错误
          if (!error.response) {
            error.isNetworkError = true;
            error.message = '网络错误，请检查您的连接';
            return Promise.reject(error);
          }
          
          // 处理401未授权
          if (error.response.status === 401) {
            storage.clearToken();
            // 不再自动跳转，而是返回带401状态码的错误
            error.message = '需要登录';
            error.showLoginPrompt = true; // 添加标记供UI层识别
          }
          
          // 统一错误格式
          const formattedError = {
            ...error,
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message || error.message
          };
          
          return Promise.reject(formattedError);
        }
      );
      
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  // ...其他方法保持不变
}

export const apiClient = new ApiClient();
