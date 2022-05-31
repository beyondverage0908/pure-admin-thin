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
// 添加用户
export const addUser = (data: object): HttpResponseType => {
  return http.request("post", "/users", { data });
};
// 编辑用户
export const editUser = (
  userId: string | number,
  data: object
): HttpResponseType => {
  return http.request("put", `/users/${userId}`, { data });
};
// 重置密码
export const resetPassword = (userId: string | number): HttpResponseType => {
  return http.request("put", `/users/${userId}/reset-pwd`);
};
