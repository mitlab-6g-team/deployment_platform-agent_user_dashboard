"use client";

import axios, { AxiosResponse } from "axios";
import APIKEYS from "@/app/api/api_key.json";
// API 配置
const PROTOCAL = process.env.PROTOCAL;
const HOST = process.env.HOST;
const API_PORT = process.env.API_PORT;
const API_ROOT = process.env.API_ROOT;
const API_VERSION = process.env.API_VERSION;
const API_TYPE = "entrypoint";
const API = `${PROTOCAL}://${HOST}:${API_PORT}/${API_ROOT}/${API_VERSION}/${API_TYPE}/Router/parse`;
console.log(API);
// Authorization
const ACCESS_TOKEN_NAME = process.env.ACCESS_TOKEN_NAME;

// 枚舉：定義 API 回應狀態碼
enum ApiResponseStatus {
  SUCCESS = 200,
  CLIENT_ERROR = 400,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

// 通用 POST 方法
const postAPI = async (
  endpoint: string,
  data: object = {},
  is_upload: boolean = false,
  is_download: boolean = false
): Promise<AxiosResponse | Error> => {
  const responseType = is_download ? "blob" : "json";
  const url = `${API}/${endpoint}`;

  try {
    const response = await axios.post(url, data, {
      responseType: responseType,
      headers: {
        "Content-Type": is_upload ? "multipart/form-data" : "application/json",
        // 其他可能需要的標頭，如授權標頭
        // 'Authorization': `Bearer ${your_token}`
      },
    });
    return handleApiResponse(response);
  } catch (error) {
    handleApiError(error);
    return error;
  }
};

// 具體的 API 請求
const login = async (data: object): Promise<AxiosResponse | Error> => {
  const endpoint = APIKEYS.LOGIN_ACCOUNT;
  return await postAPI(endpoint, data);
};

const signup = async (data: object): Promise<AxiosResponse | Error> => {
  const endpoint = "AccountValidator/signup";
  return await postAPI(endpoint, data);
};

const testAPI = async (
  endpoint: string,
  data: object
): Promise<AxiosResponse | Error> => {
  const TEST_API_BASE_URL = process.env.NEXT_PUBLIC_TEST_API;
  const url = `${TEST_API_BASE_URL}/${endpoint}`;
  try {
    const response = await axios.post(url, data);
    return handleApiResponse(response);
  } catch (error) {
    handleApiError(error);
    return error;
  }
};

// 處理 API 回應
const handleApiResponse = (response: AxiosResponse): AxiosResponse | void => {
  switch (response.status) {
    case ApiResponseStatus.SUCCESS:
      return response;
    case ApiResponseStatus.CLIENT_ERROR:
      console.error("Client Error:", response.data.detail);
      break;
    case ApiResponseStatus.METHOD_NOT_ALLOWED:
      console.error("Method Not Allowed");
      break;
    case ApiResponseStatus.INTERNAL_SERVER_ERROR:
      console.error("Internal Server Error:", response.data.detail);
      break;
    default:
      console.error("Unknown Status:", response.data.detail);
  }
};

// 處理 API 錯誤
const handleApiError = (error: any) => {
  if (error.response) {
    handleApiResponse(error.response);
  } else {
    console.error("Unknown Error:", error.message);
  }
};

// 正確導出所有需要的變量和函數
export { PROTOCAL, HOST, API_PORT, postAPI, login, signup, testAPI };
