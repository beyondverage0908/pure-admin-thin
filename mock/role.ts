import { messageBaseInfo, Method, MockType } from "./base";
import { MockMethod } from "vite-plugin-mock";
import { dataSourceEsrm } from "/@/components/PrivTree/data-source";

const getPrivs = () => ({
  url: "/p2hmgr/api/privs",
  method: "get",
  response: () => {
    return {
      ...messageBaseInfo,
      data: dataSourceEsrm
    };
  }
});

const getRoles = () => ({
  url: "/p2hmgr/api/roles/page",
  method: "get",
  response: () => {
    return {
      ...messageBaseInfo,
      data: {
        totalCount: 3,
        pageSize: 20,
        totalPage: 1,
        currPage: 1,
        list: [
          {
            roleId: 9,
            roleName: "全局管理员",
            roleType: "A",
            remark: "全局管理员",
            sysFlag: "1"
          },
          {
            roleId: 8,
            roleName: "片区管理员",
            roleType: "A",
            remark: "片区管理员",
            sysFlag: "1"
          },
          {
            roleId: 7,
            roleName: "合规管理员",
            roleType: "A",
            remark: "合规管理员",
            sysFlag: "0"
          }
        ]
      }
    };
  }
});

const deleteRole = () => ({
  url: /\/p2hmgr\/api\/roles\/\d/,
  method: "delete",
  response: () => {
    return {
      ...messageBaseInfo
    };
  }
});

const editRole = () => ({
  url: /\/p2hmgr\/api\/roles\/\d/,
  method: "put",
  response: () => {
    return {
      ...messageBaseInfo
    };
  }
});

const addRole = (): MockType => ({
  url: "/p2hmgr/api/roles",
  method: Method.post,
  response: () => {
    return {
      ...messageBaseInfo,
      data: 123
    };
  }
});

const getRoleUsers = (): MockType => ({
  url: /\/p2hmgr\/api\/roles\/\d\/users/,
  method: Method.get,
  response: ({ url }) => {
    const paths = url.split("/");
    const roleId = Number(paths[4]);
    const item = {
      userId: 4,
      userName: "admin",
      realName: "李白",
      phone: "18516133629",
      email: "zjj@163.com",
      state: 1,
      sysFlag: "0"
    };
    const list = Array.from({ length: roleId }, (_, i) => ({
      ...item,
      userId: i,
      userName: item.userName + i,
      realName: item.realName + i
    }));
    return {
      ...messageBaseInfo,
      data: {
        totalCount: 2,
        pageSize: 20,
        totalPage: 1,
        currPage: 1,
        list: list
      }
    };
  }
});

export default [
  getPrivs(),
  getRoles(),
  deleteRole(),
  editRole(),
  addRole(),
  getRoleUsers()
] as MockMethod[];
