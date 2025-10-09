import axios, { AxiosRequestConfig } from "axios";
import { get } from "lodash";
import envConfig from "../config/env";
import { message } from "antd";

export const BASE_URL = envConfig.WCS_BASE_URL;
console.log("BASE_URL", BASE_URL, window.location.hostname);

type TResponseStatusCode = {
  success: number;
  successPost: number;
  expired: number;
  forceExpired: string;
};
const ResponseStatusCode: TResponseStatusCode = {
  success: 200,
  successPost: 201,
  expired: 401,
  forceExpired: "400",
};

const timeout = 100000;
const ACCESS_TOKEN = envConfig.WCS_AUTH_TOKEN;
const REFRESH_TOKEN = "refreshToken";
const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
      "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
  },
  timeout,
};

const request = axios.create(config);
let isRefreshing = false;
let failedQueue = [];

const processQueue = async () => {
  for (const element of failedQueue) {
    const { request, originalRequest } = element;
    await request(originalRequest);
  }
  failedQueue = [];
};

// Add a request interceptor
request.interceptors.request.use(
  async (config) => {
    const access_token = envConfig.WCS_AUTH_TOKEN;
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjo0ODc0Mjc0MzYzfQ.9TZKkw2x-BO6BIWlWsM83RfbJBsppeKdkIHtltiocEM";
    if (access_token)
      config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    return response;
  },

  async function (error) {
    const originalRequest = error?.response?.config;
    if (get(error, "response.data.statusCode") === 1000) {
      console.log(
        get(error, "response.data.statusCode"),
        "changePermission_show_statusCode"
      );
      //   dispatch(changePermission(true));
    }
    // refresh token expired
    if (
      error?.response?.status === 401 &&
      originalRequest?.url === `refresh_token`
    ) {
      return Promise.reject(error);
    }

    const refreshToken = envConfig.WCS_AUTH_TOKEN;
    if (
      error?.response?.status === 401 &&
      !originalRequest?._retry &&
      refreshToken
    ) {
      if (isRefreshing) {
        failedQueue.push({ request, originalRequest });
        return;
      }
      originalRequest._retry = true;
      isRefreshing = true;
      return axios({
        ...config,
        method: "POST",
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
        .then(async (res) => {
          if (res.status === ResponseStatusCode.success) {
            const data = res?.data?.data?.data;
            localStorage.setItem(ACCESS_TOKEN, data?.accessToken);
            localStorage.setItem(REFRESH_TOKEN, data?.refreshToken);
            request.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            processQueue();
            return request(originalRequest);
          }
        })
        .catch((err) => {
          // TODO handle role permission error
          //   dispatch(userLogout(null));
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return Promise.reject(error);
  }
);

const optionDefault = {
  success: false,
  showError: false, // boolean
};
const wcsApiClient = {
  get: (url: string, data = {}) => {
    return request({ method: "get", url, params: data }).catch((err) => {
      message.error(err?.response?.data?.message || err.message);
      throw err;
    });
    // .then((res) => _handleSuccess(res, option))
    // .catch((err) => _handleError(err, option));
  },
  post: (url: string, data = {}, showSuccessMessage = true) => {
    return request({ method: "post", url, data })
      .then((res) => {
        if (showSuccessMessage && !url.includes("list"))
          // message.success(res.data.msg || "Update successful");
        return res;
      })
      .catch((err) => {
        message.error(err?.response?.data?.message || err.message);
        throw err;
      });
  },
  upload: (url: string, data = {}) => {
    return request({
      method: "post",
      url,
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
    // .then((res) => _handleSuccess(res, option))
    // .catch((err) => _handleError(err, option));
  },
  put: (url: string, data = {}) => {
    return request({ method: "put", url, data });
    // .then((res) => _handleSuccess(res, option))
    // .catch((err) => _handleError(err, option));
  },
  patch: (url: string, data = {}) => {
    return request({ method: "patch", url, data })
      .then((res) => {
        // message.success(res.data.msg || "Update successful");
        return res;
      })
      .catch((err) => {
        message.error(err?.response?.data?.message || err.message);
        throw err;
      });
    // .then((res) => _handleSuccess(res, option))
    // .catch((err) => _handleError(err, option));
  },
  delete: (url: string, data = {}, body = {}) => {
    return request({ method: "delete", url, params: data, data: body });
    // .then((res) => _handleSuccess(res, option))
    // .catch((err) => _handleError(err, option));
  },
};

export default wcsApiClient;
