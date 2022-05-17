import { messageBaseInfo, Method, MockType } from "./base";
import { MockMethod } from "vite-plugin-mock";

const getCurrUserInfo = (): MockType => ({
  url: "/p2hmgr/api/users/cur-user",
  method: Method.get,
  response: () => {
    return {
      ...messageBaseInfo,
      data: {
        userId: "8",
        userName: "李世民",
        realName: "Mr.Li",
        menuPrivs: [
          {
            privId: 1,
            parentPrivId: 0,
            privType: "C",
            privCode: "c-system-mgr-root",
            privName: "系统根"
          },
          {
            privId: 2,
            parentPrivId: 1,
            privType: "C",
            privCode: "c-proprietary-business",
            privName: "自营业务"
          },
          {
            privId: 3,
            parentPrivId: 1,
            privType: "C",
            privCode: "c-work-flow",
            privName: "工作流"
          },
          {
            privId: 4,
            parentPrivId: 1,
            privType: "C",
            privCode: "c-system-manager",
            privName: "系统管理"
          },
          {
            privId: 6,
            parentPrivId: 2,
            privType: "M",
            privCode: "m-proprietary-business",
            privName: "权益类"
          },
          {
            privId: 7,
            parentPrivId: 22,
            privType: "M",
            privCode: "m-proprietary-risk-weekly",
            privName: "自营风险周报"
          },
          {
            privId: 8,
            parentPrivId: 2,
            privType: "M",
            privCode: "m-proprietary-position-details",
            privName: "自营持仓明细"
          },
          {
            privId: 9,
            parentPrivId: 49,
            privType: "M",
            privCode: "m-manual-data-entry",
            privName: "手工数据录入"
          },
          {
            privId: 10,
            parentPrivId: 3,
            privType: "M",
            privCode: "m-wait-todo",
            privName: "待办事项"
          },
          {
            privId: 11,
            parentPrivId: 3,
            privType: "M",
            privCode: "m-done-todo",
            privName: "已办事项"
          },
          {
            privId: 12,
            parentPrivId: 3,
            privType: "M",
            privCode: "m-i-initiated",
            privName: "我发起的"
          }
        ],
        operatePrivs: [
          {
            privId: 271,
            parentPrivId: 30,
            privType: "A",
            privCode: "m-compliance-delegate-monitor:export",
            privName: "委托来源监控导出"
          },
          {
            privId: 272,
            parentPrivId: 33,
            privType: "A",
            privCode: "m-compliance-terminal-report:export",
            privName: "终端数据报备导出"
          },
          {
            privId: 273,
            parentPrivId: 35,
            privType: "A",
            privCode: "m-compliance-data-collect:export",
            privName: "监控结果汇总查询导出"
          },
          {
            privId: 267,
            parentPrivId: 25,
            privType: "A",
            privCode: "m-compliance-agentinfo:export",
            privName: "经纪人基本信息导出"
          }
        ]
      }
    };
  }
});

export default [getCurrUserInfo()] as MockMethod[];
