import { http } from "../utils/http";

interface MessageType extends Promise<any> {
  code?: number;
  message?: string;
  data?: any;
  success?: boolean;
}

// 获取权限
export const getPrivs = (): MessageType => {
  return http.request("get", "/privs");
};
/**
 * 获取角色列表
 * @param params
 * @returns
 */
export const getRoles = (params?: any): MessageType => {
  return http.request("get", "/roles/page", { params });
};
/**
 * 删除角色
 * @param roleId 角色Id
 * @returns
 */
export const deleteRole = (roleId: number): MessageType => {
  return http.request("delete", `/roles/${roleId}`);
};
