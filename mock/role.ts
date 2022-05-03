import { MockMethod } from "vite-plugin-mock";
import { dataSource } from "/@/components/PrivTree/data-source";

export default [
  {
    url: "/p2hmgr/api/privs",
    method: "get",
    response: () => {
      return {
        message: "获取成功",
        code: 200,
        data: dataSource
      };
    }
  }
] as MockMethod[];
