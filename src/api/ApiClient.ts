/* eslint-disable global-require */
import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { stringify } from "qs";

type QueryObject = { [key: string]: string | number | boolean };

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const url = "your url";
const controller = new AbortController();
const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
});

export default class ApiClient {
  static async get(
    url: string,
    params?: object,
    query?: object
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url;
    const response = await axiosInstance.get(requestUrl, {
      params,
      headers: await this.getHeaders(),
      data: {},
    });
    return response;
  }

  static async patch(
    url: string,
    query?: object,
    params?: object
  ): Promise<AxiosResponse> {
    const requestUrl = query ? `${url}?${stringify(query)}` : url;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const response = await axiosInstance.patch(requestUrl, params, config);
    return response;
  }

  static async post(
    url: string,
    query?: object,
    params?: object
  ): Promise<AxiosResponse> {
    const requestUrl = query ? `${url}?${stringify(query)}` : url;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const response = await axiosInstance.post(requestUrl, params, config);
    return response;
  }

  static async put(
    url: string,
    query?: object,
    params?: object
  ): Promise<AxiosResponse> {
    const requestUrl = query ? `${url}?${stringify(query)}` : url;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const response = await axiosInstance.put(requestUrl, params, config);
    return response;
  }

  static async delete(url: string, params?: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(params)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders("multipart/form-data"),
    };

    const response = await axiosInstance.delete(requestUrl, config);
    return response;
  }

  static async postFile(
    url: string,
    query: object,
    fileKey: string,
    file: File
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders("multipart/form-data"),
    };
    const formData = new FormData();
    formData.append(fileKey, file);
    const response = await axiosInstance.post(requestUrl, formData, config);
    return response;
  }

  private static async getHeaders(
    contentType: string = "application/json; charset=utf-8"
  ) {
    return {
      "Content-Type": contentType,
      authorization: this.getToken(),
    };
  }

  private static getToken() {
    const token: any = localStorage.getItem("token");
    return `Bearer ` + JSON.stringify(token).replaceAll(/[",\\]/g, "");
  }
}
