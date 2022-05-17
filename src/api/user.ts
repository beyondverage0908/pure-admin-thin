import { http } from "../utils/http";

// 获取已登录的信息
export const getUserInfo = (): HttpResponseType => {
  return http.request("get", "/users/cur-user");
};

// 登录
export const getLogin = (data: object) => {
  return http.request("post", "/login", { data });
};

// 刷新token
export const refreshToken = (data: object) => {
  return http.request("post", "/refreshToken", { data });
};
