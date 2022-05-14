import { http } from "../utils/http";

// 获取菜单权限
export const getPrivs = (): HttpResponseType => {
  return http.request("get", "/privs");
};
// 添加角色
export const addPrivs = (
  roleId: string | number,
  privs: number[]
): HttpResponseType => {
  return http.request("post", `/roles/${roleId}/privs`, { data: privs });
};
// 获取角色权限列表
export const getRolePrivs = (roleId: number): HttpResponseType => {
  return http.request("get", `/roles/${roleId}/privs/`);
};
/**
 * 获取按钮权限
 * @returns
 */
export const getOperatePrivs = (): HttpResponseType => {
  return http.request("get", "/operate");
};
/**
 * 添加角色
 * @param params
 * @returns
 */
export const addRole = (params: {
  roleName: string;
  remark?: string;
}): HttpResponseType => {
  return http.request("post", "/roles", { params });
};
/**
 * 获取角色列表
 * @param params
 * @returns
 */
export const getRoles = (params?: any): HttpResponseType => {
  return http.request("get", "/roles/page", { params });
};
/**
 * 删除角色
 * @param roleId 角色Id
 * @returns
 */
export const deleteRole = (roleId: number): HttpResponseType => {
  return http.request("delete", `/roles/${roleId}`);
};
/**
 * 编辑角色
 * @param roleId
 * @param params
 * @returns
 */
export const editRole = (
  roleId: number,
  params: { roleName: string; remark: string }
): HttpResponseType => {
  return http.request("put", `/roles/${roleId}`, { params });
};
/**
 * 获取角色用户
 * @param roleId
 * @param params
 * @returns
 */
export const getRoleUsers = (
  roleId: string | number,
  params?: object
): HttpResponseType => {
  return http.request("get", `/roles/${roleId}/users`, { params });
};
/**
 * 获取可添加的角色列表
 * @param roleId
 * @param params
 * @returns
 */
export const getAppendRoleUsers = (
  roleId: number,
  params: object
): HttpResponseType => {
  return http.request("get", `/roles/${roleId}/users`, { params });
};
/**
 * 提交角色用户列表
 * @param roleId
 * @param userIds
 * @returns
 */
export const appendRoleUsers = (
  roleId: number,
  userIds: Array<number>
): HttpResponseType => {
  return http.request("post", `/roles/${roleId}/users`, { data: userIds });
};
