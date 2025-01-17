import { messageBaseInfo, Method, MockType } from "./base";
import { MockMethod } from "vite-plugin-mock";
import {
  dataSourceMenuEsrm,
  dataSourceEsrmOperates,
  dataSourceEsrmRoleGetMenus
} from "/@/components/PrivTree/data-source";

const getRolePrivs = (): MockType => ({
  url: /p2hmgr\/api\/roles\/\d\/privs/,
  method: Method.get,
  response: () => ({
    ...messageBaseInfo,
    data: dataSourceEsrmRoleGetMenus
  })
});

// 获取菜单权限
const getPrivs = (): MockType => ({
  url: "/p2hmgr/api/privs",
  method: Method.get,
  response: () => {
    return {
      ...messageBaseInfo,
      data: dataSourceMenuEsrm
    };
  }
});
/**
 *
 * @returns 添加角色
 */
const addPrivs = (): MockType => ({
  url: /p2hmgr\/api\/roles\/\d\/privs/,
  method: Method.post,
  response: () => {
    return {
      ...messageBaseInfo,
      data: true
    };
  }
});

const getOperatePrivs = (): MockType => ({
  url: "/p2hmgr/api/operate",
  method: Method.get,
  response: () => {
    return {
      ...messageBaseInfo,
      data: dataSourceEsrmOperates
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
/**
 * 获取可添加角色用户的列表
 * @returns
 */
const getAppendRoleUsers = (): MockType => ({
  url: /\/p2hmgr\/api\/roles\/\d\/users/,
  method: Method.get,
  response: () => {
    return {
      ...messageBaseInfo,
      data: {
        totalCount: 1,
        pageSize: 20,
        totalPage: 1,
        currPage: 1,
        list: [
          {
            userId: 6,
            userName: "test",
            realName: "zjw",
            phone: "",
            email: "",
            state: 1,
            sysFlag: "0"
          },
          {
            userId: 6,
            userName: "liwei",
            realName: "李伟",
            phone: "18546936958",
            email: "jc@gmail.com",
            state: 1,
            sysFlag: "0"
          }
        ]
      }
    };
  }
});
// 提交角色id列表
export const appendRoleUsers = (): MockType => ({
  url: /\/p2hmgr\/api\/roles\/\d\/users/,
  method: Method.post,
  response: () => {
    return {
      ...messageBaseInfo
    };
  }
});
// 获取用户列表
export const getUserList = (): MockType => ({
  url: "/p2hmgr/api/users/page",
  method: Method.get,
  response: () => {
    const tableList = Array.from({ length: Date.now() % 100 }, (_, index) => ({
      userId: 1 + index,
      userName: "test" + index,
      realName: "zjw" + index,
      phone: "18516133628",
      email: "test@163.com",
      state: 1,
      sysFlag: "1",
      userPwd: "Abc@1234-" + index
    }));
    return {
      ...messageBaseInfo,
      data: {
        list: tableList,
        currPage: 1,
        totalCount: tableList.length,
        totalPage: 1
      }
    };
  }
});
// 添加用户
export const addUser = (): MockType => ({
  url: "/p2hmgr/api/users",
  method: Method.post,
  response: () => {
    return {
      ...messageBaseInfo
    };
  }
});
// 编辑用户
export const editUser = (): MockType => ({
  url: /\/p2hmgr\/api\/users\/\d/,
  method: Method.put,
  response: () => {
    return {
      ...messageBaseInfo
    };
  }
});
// 重置密码
export const resetPassword = (): MockType => ({
  url: /\/p2hmgr\/api\/users\/\d\/reset-pwd/,
  method: Method.put,
  response: () => {
    return {
      ...messageBaseInfo
    };
  }
});

export default [
  getPrivs(),
  getOperatePrivs(),
  getRoles(),
  deleteRole(),
  editRole(),
  addRole(),
  getRoleUsers(),
  getAppendRoleUsers(),
  appendRoleUsers(),
  addPrivs(),
  getRolePrivs(),
  getUserList(),
  addUser(),
  editUser(),
  resetPassword()
] as MockMethod[];
