import { http } from "../utils/http";

// 获取已登录的信息
export const getUserInfo = (): HttpResponseType => {
  return http.request("get", "/users/cur-user");
};

// 登录
export const getLogin = (data: object): HttpResponseType => {
  return http.request("post", "/login", { data });
};

// 刷新token
export const refreshToken = (data: object): HttpResponseType => {
  return http.request("post", "/refreshToken", { data });
};

// 获取用户列表
export const getUserList = (params: object): HttpResponseType => {
  return http.request("get", "/users/page", { params });
};
