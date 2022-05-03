import { MockMethod } from "vite-plugin-mock";
import { dataSource } from "/@/components/PrivTree/data-source";

const getPrivs = () => ({
  url: "/p2hmgr/api/privs",
  method: "get",
  response: () => {
    return {
      message: "获取成功",
      code: 200,
      data: dataSource,
      success: true
    };
  }
});

export default [getPrivs()] as MockMethod[];
