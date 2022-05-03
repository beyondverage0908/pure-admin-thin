import { messageBaseInfo } from "./base";
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
        totalCount: 1,
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

export default [getPrivs(), getRoles(), deleteRole()] as MockMethod[];
