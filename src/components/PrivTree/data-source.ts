import { Tree } from "./index";
/**
 * 数据源
 */
export const dataSource: Tree[] = [
  {
    id: 1,
    code: "level-one-1",
    label: "Level one 1",
    children: [
      {
        id: 4,
        code: "level-two-1-1",
        label: "Level two 1-1",
        parentId: 1,
        children: [
          {
            id: 9,
            code: "level-three 1-1-1",
            label: "Level three 1-1-1",
            parentId: 4
          },
          {
            id: 10,
            code: "level-three-1-1-2",
            label: "Level three 1-1-2",
            parentId: 4,
            children: [
              {
                id: 11,
                label: "Level Four 1-1-1-1",
                code: "level-four-1-1-1-1",
                parentId: 10
              },
              { id: 12, label: "Level Four 1-1-1-2", parentId: 10 },
              { id: 13, label: "Level Four 1-1-1-4", parentId: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
        parentId: 2
      },
      {
        id: 6,
        label: "Level two 2-2",
        parentId: 2
      }
    ]
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
        parentId: 3
      },
      {
        id: 8,
        label: "Level two 3-2",
        parentId: 3
      }
    ]
  }
];
/**
 * esrm数据源
 */
export const dataSourceEsrm = [
  {
    privId: 274,
    parentPrivId: 198,
    privType: "C",
    privCode: "c-credit-rh-contract-mgr",
    privName: "合约信息监控及处置查询"
  },
  {
    privId: 275,
    parentPrivId: 274,
    privType: "M",
    privCode: "m-credit-rh-financing-contract",
    privName: "融资合约监控及处置查询"
  },
  {
    privId: 257,
    parentPrivId: 255,
    privType: "M",
    privCode: "m-proprietary-zyysp-onexchangemgr-upd",
    privName: "场内持仓主动管理-编辑"
  },
  {
    privId: 253,
    parentPrivId: 2,
    privType: "C",
    privCode: "c-proprietary-zyysp",
    privName: "衍生品"
  },
  {
    privId: 254,
    parentPrivId: 253,
    privType: "M",
    privCode: "m-proprietary-zyysp-onexchangeqty",
    privName: "场内持仓查询管理"
  },
  {
    privId: 248,
    parentPrivId: 247,
    privType: "M",
    privCode: "m-proprietary-wwzg-positionupload",
    privName: "委外资管持仓文件管理"
  },
  {
    privId: 247,
    parentPrivId: 2,
    privType: "C",
    privCode: "c-proprietary-wwzg",
    privName: "委外类"
  },
  {
    privId: 244,
    parentPrivId: 243,
    privType: "M",
    privCode: "m-risk-zjjc-expert",
    privName: "专家库管理"
  },
  {
    privId: 243,
    parentPrivId: 1,
    privType: "C",
    privCode: "c-risk-zjjc",
    privName: "专家库监测"
  },
  {
    privId: 242,
    parentPrivId: 241,
    privType: "M",
    privCode: "m-credit-data-file-export",
    privName: "业务数据导出记录"
  },
  {
    privId: 241,
    parentPrivId: 52,
    privType: "C",
    privCode: "c-credit-data-file-manage",
    privName: "数据管理"
  },
  {
    privId: 235,
    parentPrivId: 155,
    privType: "M",
    privCode: "m-credit-manual-commom-config",
    privName: "通用配置"
  },
  {
    privId: 238,
    parentPrivId: 52,
    privType: "C",
    privCode: "c-credit-pressure-test",
    privName: "压力测试"
  },
  {
    privId: 239,
    parentPrivId: 238,
    privType: "M",
    privCode: "m-credit-pressure-test-stragegy",
    privName: "常用压测策略管理"
  },
  {
    privId: 240,
    parentPrivId: 238,
    privType: "M",
    privCode: "m-credit-pressure-test-analysis",
    privName: "压力测试分析-常规"
  },
  {
    privId: 236,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-data-overview",
    privName: "合规监测概览"
  },
  {
    privId: 234,
    parentPrivId: 155,
    privType: "M",
    privCode: "m-credit-business-manual-config",
    privName: "信用风控业务配置"
  },
  {
    privId: 211,
    parentPrivId: 198,
    privType: "C",
    privCode: "c-credit-riskhandling-role-info-mgr",
    privName: "业务角色信息管理"
  },
  {
    privId: 212,
    parentPrivId: 211,
    privType: "M",
    privCode: "m-credit-riskhandling-role-mgr",
    privName: "角色管理"
  },
  {
    privId: 213,
    parentPrivId: 211,
    privType: "M",
    privCode: "m-credit-riskhandling-org-mgr",
    privName: "组织架构"
  },
  {
    privId: 214,
    parentPrivId: 211,
    privType: "M",
    privCode: "m-credit-riskhandling-staff-mgr",
    privName: "员工资料信息"
  },
  {
    privId: 215,
    parentPrivId: 211,
    privType: "M",
    privCode: "m-credit-riskhandling-oa-mgr",
    privName: "集团oa信息"
  },
  {
    privId: 216,
    parentPrivId: 198,
    privType: "C",
    privCode: "c-credit-rh-flow-mgr",
    privName: "流程管理"
  },
  {
    privId: 217,
    parentPrivId: 216,
    privType: "C",
    privCode: "c-credit-rh-visit",
    privName: "回访话术管理"
  },
  {
    privId: 218,
    parentPrivId: 216,
    privType: "M",
    privCode: "m-credit-rh-notice-template",
    privName: "通知模板设置"
  },
  {
    privId: 219,
    parentPrivId: 217,
    privType: "M",
    privCode: "m-credit-rh-visit-category",
    privName: "回访话术分类管理"
  },
  {
    privId: 220,
    parentPrivId: 217,
    privType: "M",
    privCode: "m-credit-rh-visit-tmp-setting",
    privName: "回访话术模板设置"
  },
  {
    privId: 221,
    parentPrivId: 198,
    privType: "C",
    privCode: "c-credit-rh-deal-mgr",
    privName: "处置管理及查询"
  },
  {
    privId: 222,
    parentPrivId: 198,
    privType: "C",
    privCode: "c-credit-rh-monitor-handling-tj",
    privName: "客户监控及处置情况查询及统计"
  },
  {
    privId: 223,
    parentPrivId: 221,
    privType: "M",
    privCode: "m-credit-rh-deal-multiple-screen",
    privName: "处置任务监控-多屏工具"
  },
  {
    privId: 224,
    parentPrivId: 221,
    privType: "M",
    privCode: "m-credit-rh-deal-summary-list",
    privName: "处置综合查询列表"
  },
  {
    privId: 225,
    parentPrivId: 221,
    privType: "M",
    privCode: "m-credit-rh-deal-detail-list",
    privName: "处置任务详情列表"
  },
  {
    privId: 226,
    parentPrivId: 222,
    privType: "M",
    privCode: "m-credit-rh-realtime-history",
    privName: "客户预警及监控详情(实时、历史)"
  },
  {
    privId: 227,
    parentPrivId: 222,
    privType: "M",
    privCode: "m-credit-rh-monitor-tj",
    privName: "客户历史风险监控预警情况及统计"
  },
  {
    privId: 228,
    parentPrivId: 222,
    privType: "M",
    privCode: "m-credit-rh-deal-tj",
    privName: "客户历史处置详情查询及统计"
  },
  {
    privId: 229,
    parentPrivId: 222,
    privType: "M",
    privCode: "m-credit-rh-link-update",
    privName: "客户联系方式查询及维护"
  },
  {
    privId: 230,
    parentPrivId: 222,
    privType: "M",
    privCode: "m-credit-rh-visit-history-tj",
    privName: "客户历史回访情况记录查询及统计"
  },
  {
    privId: 231,
    parentPrivId: 222,
    privType: "M",
    privCode: "m-credit-rh-offline-notice-tj",
    privName: "线下未完成通知送达统计表"
  },
  {
    privId: 232,
    parentPrivId: 222,
    privType: "M",
    privCode: "m-credit-workorder-query",
    privName: "回访工单任务查询"
  },
  {
    privId: 206,
    parentPrivId: 202,
    privType: "M",
    privCode: "m-credit-rh-monitor-task-detail",
    privName: "风险监控详情列表"
  },
  {
    privId: 204,
    parentPrivId: 202,
    privType: "M",
    privCode: "m-credit-rh-monitor-screen",
    privName: "风险监控多屏工具"
  },
  {
    privId: 205,
    parentPrivId: 202,
    privType: "M",
    privCode: "m-credit-rh-monitor-task-list",
    privName: "风险预警监控任务管理列表"
  },
  {
    privId: 203,
    parentPrivId: 202,
    privType: "M",
    privCode: "m-credit-rh-monitor-class",
    privName: "风险监控分类管理"
  },
  {
    privId: 201,
    parentPrivId: 199,
    privType: "M",
    privCode: "m-credit-rh-monitor-custom-detail",
    privName: "监控用户名单明细"
  },
  {
    privId: 202,
    parentPrivId: 198,
    privType: "C",
    privCode: "c-credit-rh-monitor-list-mgr",
    privName: "监控预警管理及查询"
  },
  {
    privId: 200,
    parentPrivId: 199,
    privType: "M",
    privCode: "m-credit-rh-monitor-custom-list",
    privName: "客户人群监控名单列表"
  },
  {
    privId: 198,
    parentPrivId: 52,
    privType: "C",
    privCode: "c-credit-riskhandling-mgr",
    privName: "风险监控通知及处置"
  },
  {
    privId: 199,
    parentPrivId: 198,
    privType: "C",
    privCode: "c-credit-rh-monitor-custom-list-mgr",
    privName: "监控用户名单管理"
  },
  {
    privId: 197,
    parentPrivId: 49,
    privType: "M",
    privCode: "m-business-manual-excel-baseline",
    privName: "比较基准导入"
  },
  {
    privId: 196,
    parentPrivId: 3,
    privType: "M",
    privCode: "m-process-flow-config",
    privName: "流程配置"
  },
  {
    privId: 187,
    parentPrivId: 2,
    privType: "C",
    privCode: "c-business-fixedincome",
    privName: "固收类"
  },
  {
    privId: 188,
    parentPrivId: 187,
    privType: "C",
    privCode: "c-business-fixedincome-today",
    privName: "当日概况"
  },
  {
    privId: 189,
    parentPrivId: 187,
    privType: "M",
    privCode: "m-business-fixedincome-monitor",
    privName: "指标监控"
  },
  {
    privId: 190,
    parentPrivId: 187,
    privType: "C",
    privCode: "c-business-fixedincome-chicang",
    privName: "固收持仓"
  },
  {
    privId: 191,
    parentPrivId: 188,
    privType: "M",
    privCode: "m-business-fixedincome-today-market",
    privName: "市场行情"
  },
  {
    privId: 192,
    parentPrivId: 188,
    privType: "M",
    privCode: "m-business-fixedincome-today-summary",
    privName: "组合概况"
  },
  {
    privId: 193,
    parentPrivId: 190,
    privType: "M",
    privCode: "m-business-fixedincome-chicang-bond",
    privName: "债券"
  },
  {
    privId: 194,
    parentPrivId: 190,
    privType: "M",
    privCode: "m-business-fixedincome-chicang-future",
    privName: "国债期货"
  },
  {
    privId: 195,
    parentPrivId: 190,
    privType: "M",
    privCode: "m-business-fixedincome-chicang-borrow",
    privName: "回购拆借"
  },
  {
    privId: 185,
    parentPrivId: 104,
    privType: "C",
    privCode: "c-credit-coefficient-deposit-proportion",
    privName: "折算率及两融保证金比例调整"
  },
  {
    privId: 186,
    parentPrivId: 104,
    privType: "C",
    privCode: "c-credit-zqmd-mgr",
    privName: "证券名单管理"
  },
  {
    privId: 183,
    parentPrivId: 181,
    privType: "M",
    privCode: "m-risk-report-upload",
    privName: "报告上传"
  },
  {
    privId: 184,
    parentPrivId: 181,
    privType: "M",
    privCode: "m-risk-people-config",
    privName: "业务配置"
  },
  {
    privId: 181,
    parentPrivId: 1,
    privType: "C",
    privCode: "c-risk-report-mgr",
    privName: "风险管理报告"
  },
  {
    privId: 182,
    parentPrivId: 181,
    privType: "M",
    privCode: "m-risk-daily-report",
    privName: "日报"
  },
  {
    privId: 172,
    parentPrivId: 171,
    privType: "M",
    privCode: "m-credit-cust-score-params",
    privName: "客户信用评分参数设定管理"
  },
  {
    privId: 173,
    parentPrivId: 171,
    privType: "M",
    privCode: "m-credit-cust-sys-compute",
    privName: "评分查询-系统定时计算数据"
  },
  {
    privId: 174,
    parentPrivId: 171,
    privType: "M",
    privCode: "m-credit-cust-manual-compute",
    privName: "评分查询--人工计算表（仅供模型调试使用）"
  },
  {
    privId: 175,
    parentPrivId: 162,
    privType: "C",
    privCode: "c-credit-cust-info-mgr",
    privName: "客户信息查询管理"
  },
  {
    privId: 176,
    parentPrivId: 175,
    privType: "M",
    privCode: "m-credit-cust-info-summary",
    privName: "客户综合信息展示表(T-1日日终)--暂定凌晨1点计算"
  },
  {
    privId: 177,
    parentPrivId: 175,
    privType: "M",
    privCode: "m-credit-cust-info-risk",
    privName: "客户信息及风险统计详情"
  },
  {
    privId: 178,
    parentPrivId: 175,
    privType: "M",
    privCode: "m-credit-cust-info-rongquan",
    privName: "客户融券情况表(T-1日日终)--暂定凌晨1点计算"
  },
  {
    privId: 179,
    parentPrivId: 175,
    privType: "M",
    privCode: "m-credit-cust-info-rongzi",
    privName: "客户融资情况表(T-1日日终)--暂定凌晨1点计算"
  },
  {
    privId: 180,
    parentPrivId: 175,
    privType: "M",
    privCode: "m-credit-cust-info-contract",
    privName: "客户合约到/展期情况表(T-1日日终)--暂定凌晨1点计算"
  },
  {
    privId: 162,
    parentPrivId: 52,
    privType: "C",
    privCode: "c-credit-custom-mgr",
    privName: "客户管理"
  },
  {
    privId: 163,
    parentPrivId: 162,
    privType: "C",
    privCode: "c-credit-cust-portal-query",
    privName: "画像指标查询"
  },
  {
    privId: 164,
    parentPrivId: 163,
    privType: "M",
    privCode: "m-credit-cust-portal-query",
    privName: "画像指标查询"
  },
  {
    privId: 165,
    parentPrivId: 163,
    privType: "M",
    privCode: "m-credit-cust-user-query",
    privName: "用户指标数值查询"
  },
  {
    privId: 166,
    parentPrivId: 162,
    privType: "C",
    privCode: "c-credit-cust-label-mgr",
    privName: "用户标签管理"
  },
  {
    privId: 167,
    parentPrivId: 166,
    privType: "M",
    privCode: "m-credit-cust-summary-query",
    privName: "客户标签综合查询列表"
  },
  {
    privId: 168,
    parentPrivId: 166,
    privType: "M",
    privCode: "m-credit-cust-main-class",
    privName: "客户主标签分类管理"
  },
  {
    privId: 169,
    parentPrivId: 166,
    privType: "M",
    privCode: "m-credit-cust-sub-class",
    privName: "客户子标签分类管理"
  },
  {
    privId: 170,
    parentPrivId: 166,
    privType: "M",
    privCode: "m-credit-cust-label",
    privName: "标签管理"
  },
  {
    privId: 171,
    parentPrivId: 162,
    privType: "C",
    privCode: "c-credit-cust-summary-score",
    privName: "客户信用综合评分管理"
  },
  {
    privId: 161,
    parentPrivId: 4,
    privType: "M",
    privCode: "m-user-group-management",
    privName: "用户组管理"
  },
  {
    privId: 157,
    parentPrivId: 112,
    privType: "C",
    privCode: "c-credit-batch-import-dbp",
    privName: "批量导入管理"
  },
  {
    privId: 158,
    parentPrivId: 157,
    privType: "M",
    privCode: "m-credit-batch-import-dbp-mgr",
    privName: "担保品调整批量导入管理"
  },
  {
    privId: 159,
    parentPrivId: 157,
    privType: "M",
    privCode: "m-credit-batch-import-rz",
    privName: "融资标的名单调整批量导入管理"
  },
  {
    privId: 160,
    parentPrivId: 157,
    privType: "M",
    privCode: "m-credit-batch-import-rq",
    privName: "融券标的名单调整批量导入管理"
  },
  {
    privId: 152,
    parentPrivId: 151,
    privType: "M",
    privCode: "m-credit-rate-batch-import",
    privName: "模型折算率批量导入"
  },
  {
    privId: 153,
    parentPrivId: 151,
    privType: "M",
    privCode: "m-credit-rongquan-batch-import",
    privName: "模型融券保证金比例导入"
  },
  {
    privId: 154,
    parentPrivId: 151,
    privType: "M",
    privCode: "m-credit-rongzi-batch-import",
    privName: "模型融资保证金比例导入"
  },
  {
    privId: 155,
    parentPrivId: 52,
    privType: "C",
    privCode: "c-credit-manual-config",
    privName: "手工计算任务"
  },
  {
    privId: 156,
    parentPrivId: 155,
    privType: "M",
    privCode: "m-credit-task-manual",
    privName: "手工任务"
  },
  {
    privId: 104,
    parentPrivId: 52,
    privType: "C",
    privCode: "c-credit-zq-mgr",
    privName: "证券管理"
  },
  {
    privId: 105,
    parentPrivId: 186,
    privType: "M",
    privCode: "m-credit-classify-mgr",
    privName: "证券分类管理(新上市，注册制)"
  },
  {
    privId: 106,
    parentPrivId: 186,
    privType: "M",
    privCode: "m-credit-wait-listof-securities",
    privName: "待上市证券一览及上市首日证券担保品及两融标的管理"
  },
  {
    privId: 107,
    parentPrivId: 186,
    privType: "C",
    privCode: "c-credit-observe-list",
    privName: "证券观察名单管理"
  },
  {
    privId: 108,
    parentPrivId: 107,
    privType: "M",
    privCode: "m-credit-monitoring-list-group-set",
    privName: "监控名单分组设置"
  },
  {
    privId: 109,
    parentPrivId: 107,
    privType: "M",
    privCode: "m-credit-monitoring-list-list",
    privName: "证券观察监控名单列表"
  },
  {
    privId: 110,
    parentPrivId: 107,
    privType: "M",
    privCode: "m-credit-monitoring-list-delete",
    privName: "批量删除观察名单证券导入"
  },
  {
    privId: 111,
    parentPrivId: 107,
    privType: "M",
    privCode: "m-credit-monitoring-list-add",
    privName: "批量增加观察名单证券导入"
  },
  {
    privId: 112,
    parentPrivId: 104,
    privType: "C",
    privCode: "c-credit-dbp-target-mgr",
    privName: "担保品与两融标的调整"
  },
  {
    privId: 113,
    parentPrivId: 112,
    privType: "C",
    privCode: "c-credit-dbp-adjustment",
    privName: "担保品调整管理"
  },
  {
    privId: 114,
    parentPrivId: 113,
    privType: "M",
    privCode: "m-credit-dbp-adjustment-mgr",
    privName: "担保品调整管理"
  },
  {
    privId: 115,
    parentPrivId: 113,
    privType: "M",
    privCode: "m-credit-dbp-adjustment-check-list",
    privName: "担保品调整待审核列表"
  },
  {
    privId: 116,
    parentPrivId: 113,
    privType: "M",
    privCode: "m-credit-dbp-adjustment-check-history",
    privName: "担保品审核记录"
  },
  {
    privId: 117,
    parentPrivId: 112,
    privType: "C",
    privCode: "c-credit-rq-adjustment",
    privName: "融券标的调整管理"
  },
  {
    privId: 118,
    parentPrivId: 117,
    privType: "M",
    privCode: "m-credit-rq-adjustment-mgr",
    privName: "融券标的调整管理"
  },
  {
    privId: 119,
    parentPrivId: 117,
    privType: "M",
    privCode: "m-credit-rq-adjustment-check-list",
    privName: "融券标的调整待审核列表"
  },
  {
    privId: 120,
    parentPrivId: 117,
    privType: "M",
    privCode: "m-credit-rq-adjustment-check-history",
    privName: "融券标的调整审核记录"
  },
  {
    privId: 121,
    parentPrivId: 112,
    privType: "C",
    privCode: "c-credit-rz-adjustment",
    privName: "融资标的调整管理"
  },
  {
    privId: 122,
    parentPrivId: 121,
    privType: "M",
    privCode: "m-credit-rz-adjustment-mgr",
    privName: "融资标的调整管理"
  },
  {
    privId: 123,
    parentPrivId: 121,
    privType: "M",
    privCode: "m-credit-rz-adjustment-check-list",
    privName: "融资标的调整待审核列表"
  },
  {
    privId: 124,
    parentPrivId: 121,
    privType: "M",
    privCode: "m-credit-rz-adjustment-check-history",
    privName: "融资标的调整审核记录"
  },
  {
    privId: 125,
    parentPrivId: 104,
    privType: "C",
    privCode: "c-credit-coefficient-deposit-params",
    privName: "模型折算率及保证金比例取值管理"
  },
  {
    privId: 126,
    parentPrivId: 125,
    privType: "M",
    privCode: "m-credit-model-coefficient-params-mgr",
    privName: "模型折算率参数管理"
  },
  {
    privId: 127,
    parentPrivId: 125,
    privType: "M",
    privCode: "m-credit-model-rz-params-mgr",
    privName: "模型融资保证金比例参数管理"
  },
  {
    privId: 128,
    parentPrivId: 125,
    privType: "M",
    privCode: "m-credit-model-rq-params-mgr",
    privName: "模型融券保证金比例参数管理"
  },
  {
    privId: 129,
    parentPrivId: 185,
    privType: "C",
    privCode: "c-credit-conversion-rate-mgr",
    privName: "折算率管理列表"
  },
  {
    privId: 130,
    parentPrivId: 129,
    privType: "C",
    privCode: "c-credit-zq-mgr-rate-mgr",
    privName: "证券折算率综合管理列表"
  },
  {
    privId: 132,
    parentPrivId: 130,
    privType: "M",
    privCode: "m-credit-zq-conversion-rate-mgr",
    privName: "股票折算率综合管理列表"
  },
  {
    privId: 133,
    parentPrivId: 130,
    privType: "M",
    privCode: "m-credit-wait-audit-rate-mgr",
    privName: "股票折算率待审核列表"
  },
  {
    privId: 134,
    parentPrivId: 130,
    privType: "M",
    privCode: "m-credit-gp-audited-history",
    privName: "股票折算率审核记录列表"
  },
  {
    privId: 135,
    parentPrivId: 129,
    privType: "C",
    privCode: "c-credit-zq-mgr-fund-rate-mgr",
    privName: "基金折算率综合管理列表"
  },
  {
    privId: 136,
    parentPrivId: 135,
    privType: "M",
    privCode: "m-credit-fund-conversion-rate-mgr",
    privName: "基金折算率综合管理列表"
  },
  {
    privId: 137,
    parentPrivId: 135,
    privType: "M",
    privCode: "m-credit-wait-rate-mgr",
    privName: "基金折算率待审核列表"
  },
  {
    privId: 138,
    parentPrivId: 135,
    privType: "M",
    privCode: "m-credit-fund-audited-history",
    privName: "基金折算率审核记录列表"
  },
  {
    privId: 139,
    parentPrivId: 129,
    privType: "C",
    privCode: "c-credit-bond-rate-mgr",
    privName: "债券折算率综合管理列表"
  },
  {
    privId: 140,
    parentPrivId: 139,
    privType: "M",
    privCode: "m-credit-bond-conversion-rate-mgr",
    privName: "债券折算率综合管理列表"
  },
  {
    privId: 141,
    parentPrivId: 139,
    privType: "M",
    privCode: "m-credit-bond-conversion-rate-audit-mgr",
    privName: "债券折算率待审核列表"
  },
  {
    privId: 142,
    parentPrivId: 139,
    privType: "M",
    privCode: "m-credit-bond-audited-history",
    privName: "债券折算率审核记录列表"
  },
  {
    privId: 143,
    parentPrivId: 185,
    privType: "C",
    privCode: "c-credit-bond-financing-list",
    privName: "融资保证金比例管理列表"
  },
  {
    privId: 144,
    parentPrivId: 143,
    privType: "M",
    privCode: "m-credit-bond-financing-mgr",
    privName: "证券融资保证金比例综合管理列表"
  },
  {
    privId: 145,
    parentPrivId: 143,
    privType: "M",
    privCode: "m-credit-zq-bond-audit-mgr",
    privName: "证券融资保证金比例待审核列表"
  },
  {
    privId: 146,
    parentPrivId: 143,
    privType: "M",
    privCode: "m-credit-zq-bond-audited-record-mgr",
    privName: "证券融资保证金比例审核记录列表"
  },
  {
    privId: 147,
    parentPrivId: 185,
    privType: "C",
    privCode: "c-credit-bond-securities-list",
    privName: "融券保证金比例管理列表"
  },
  {
    privId: 148,
    parentPrivId: 147,
    privType: "M",
    privCode: "m-credit-bond-securities-mgr",
    privName: "证券融券保证金比例综合管理列表"
  },
  {
    privId: 149,
    parentPrivId: 147,
    privType: "M",
    privCode: "m-credit-bond-securities-audit-mgr",
    privName: "证券融券保证金比例待审核列表"
  },
  {
    privId: 150,
    parentPrivId: 147,
    privType: "M",
    privCode: "m-credit-bond-securities-audit-record-mgr",
    privName: "证券保证金比例审核记录列表"
  },
  {
    privId: 151,
    parentPrivId: 185,
    privType: "C",
    privCode: "c-credit-batch-import",
    privName: "批量导入管理"
  },
  {
    privId: 98,
    parentPrivId: 1,
    privType: "C",
    privCode: "c-fund-ivt-mgr",
    privName: "基金投顾"
  },
  {
    privId: 99,
    parentPrivId: 98,
    privType: "M",
    privCode: "m-fd-ivt-business-overview",
    privName: "业务概况"
  },
  {
    privId: 100,
    parentPrivId: 98,
    privType: "M",
    privCode: "m-fd-ivt-flag-monitor",
    privName: "指标监控"
  },
  {
    privId: 101,
    parentPrivId: 98,
    privType: "C",
    privCode: "c-fd-ivt-task-manual-mgr",
    privName: "手工配置"
  },
  {
    privId: 102,
    parentPrivId: 101,
    privType: "M",
    privCode: "m-fd-ivt-task-manual",
    privName: "手工任务"
  },
  {
    privId: 103,
    parentPrivId: 101,
    privType: "M",
    privCode: "m-fd-ivt-business-config",
    privName: "基金投顾业务配置"
  },
  {
    privId: 74,
    parentPrivId: 1,
    privType: "C",
    privCode: "c-credit-mgr",
    privName: "信用业务"
  },
  {
    privId: 75,
    parentPrivId: 74,
    privType: "C",
    privCode: "c-credit-mgr-rzrq",
    privName: "融资融券"
  },
  {
    privId: 76,
    parentPrivId: 75,
    privType: "M",
    privCode: "m-credit-rzrq-bis-report",
    privName: "业务报表"
  },
  {
    privId: 77,
    parentPrivId: 75,
    privType: "M",
    privCode: "m-credit-rzrq-wb-monitor",
    privName: "维保比例监控"
  },
  {
    privId: 78,
    parentPrivId: 75,
    privType: "M",
    privCode: "m-credit-rzrq-expect-reduce",
    privName: "预期信用减值"
  },
  {
    privId: 79,
    parentPrivId: 74,
    privType: "C",
    privCode: "c-credit-mgr-zrt",
    privName: "转融通"
  },
  {
    privId: 80,
    parentPrivId: 79,
    privType: "M",
    privCode: "m-credit-zrt-bis-report",
    privName: "业务报表"
  },
  {
    privId: 81,
    parentPrivId: 74,
    privType: "C",
    privCode: "c-credit-mgr-gpzy",
    privName: "股票质押"
  },
  {
    privId: 82,
    parentPrivId: 81,
    privType: "M",
    privCode: "m-credit-gpzy-bis-report",
    privName: "业务报表"
  },
  {
    privId: 83,
    parentPrivId: 81,
    privType: "M",
    privCode: "m-credit-gpzy-expect-reduce",
    privName: "预期信用减值"
  },
  {
    privId: 84,
    parentPrivId: 74,
    privType: "C",
    privCode: "c-credit-mgr-gpqq",
    privName: "股票期权"
  },
  {
    privId: 85,
    parentPrivId: 84,
    privType: "C",
    privCode: "c-credit-mgr-fxjk",
    privName: "风险监控"
  },
  {
    privId: 86,
    parentPrivId: 85,
    privType: "M",
    privCode: "m-credit-bzj-monitor",
    privName: "客户保证金监控"
  },
  {
    privId: 87,
    parentPrivId: 85,
    privType: "M",
    privCode: "m-credit-chicang-indicator",
    privName: "客户持仓风险指标"
  },
  {
    privId: 88,
    parentPrivId: 85,
    privType: "M",
    privCode: "m-credit-xingquan-monirot",
    privName: "客户行权风险监控"
  },
  {
    privId: 89,
    parentPrivId: 85,
    privType: "M",
    privCode: "m-credit-pingcang-indicator",
    privName: "客户强行平仓指标"
  },
  {
    privId: 90,
    parentPrivId: 85,
    privType: "M",
    privCode: "m-credit-trade-monitor",
    privName: "异常交易行为监控"
  },
  {
    privId: 91,
    parentPrivId: 84,
    privType: "M",
    privCode: "m-credit-market-summary",
    privName: "市场概况"
  },
  {
    privId: 92,
    parentPrivId: 84,
    privType: "C",
    privCode: "c-credit-business-summary",
    privName: "业务概况"
  },
  {
    privId: 93,
    parentPrivId: 92,
    privType: "M",
    privCode: "m-credit-business-guimo",
    privName: "业务规模"
  },
  {
    privId: 94,
    parentPrivId: 92,
    privType: "M",
    privCode: "m-credit-business-fener",
    privName: "市场份额"
  },
  {
    privId: 95,
    parentPrivId: 84,
    privType: "C",
    privCode: "c-credit-mgr-manual",
    privName: "手工配置"
  },
  {
    privId: 96,
    parentPrivId: 95,
    privType: "M",
    privCode: "m-credit-business-config",
    privName: "信用业务配置"
  },
  {
    privId: 97,
    parentPrivId: 95,
    privType: "M",
    privCode: "m-credit-manual-task",
    privName: "手工任务"
  },
  {
    privId: 70,
    parentPrivId: 49,
    privType: "M",
    privCode: "m-proprietary-manual-task",
    privName: "手工任务"
  },
  {
    privId: 71,
    parentPrivId: 23,
    privType: "C",
    privCode: "c-compliance-mgr-manual",
    privName: "手工配置"
  },
  {
    privId: 72,
    parentPrivId: 71,
    privType: "M",
    privCode: "m-compliance-bussiness-config",
    privName: "合规业务配置"
  },
  {
    privId: 73,
    parentPrivId: 71,
    privType: "M",
    privCode: "m-compliance-manual-task",
    privName: "手工任务"
  },
  {
    privId: 61,
    parentPrivId: 60,
    privType: "M",
    privCode: "m-credit-whole-tag-list",
    privName: "证券标签综合查询列表"
  },
  {
    privId: 69,
    parentPrivId: 68,
    privType: "M",
    privCode: "m-credit-strategy",
    privName: "策略管理"
  },
  {
    privId: 52,
    parentPrivId: 1,
    privType: "C",
    privCode: "c-credit-dashboard",
    privName: "信用风控中台"
  },
  {
    privId: 53,
    parentPrivId: 52,
    privType: "C",
    privCode: "c-credit-zq-fengping",
    privName: "证券风评"
  },
  {
    privId: 54,
    parentPrivId: 53,
    privType: "C",
    privCode: "c-credit-whole-list",
    privName: "证券风评综合列表"
  },
  {
    privId: 55,
    parentPrivId: 54,
    privType: "M",
    privCode: "m-credit-fengping-list",
    privName: "证券风评列表"
  },
  {
    privId: 50,
    parentPrivId: 49,
    privType: "M",
    privCode: "m-manual-securities-source",
    privName: "融券券源调仓"
  },
  {
    privId: 23,
    parentPrivId: 1,
    privType: "C",
    privCode: "c-compliance-mgr",
    privName: "合规监测"
  },
  {
    privId: 24,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-staffinfo",
    privName: "员工基本信息"
  },
  {
    privId: 25,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-agentinfo",
    privName: "经纪人基本信息"
  },
  {
    privId: 26,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-agent-dept",
    privName: "经纪人部门异常信息"
  },
  {
    privId: 27,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-kh-monitor",
    privName: "员工及经纪人开户监控"
  },
  {
    privId: 28,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-trade-monitor",
    privName: "员工及经纪人交易监控"
  },
  {
    privId: 29,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-holding-monitor",
    privName: "员工及经纪人持仓监控"
  },
  {
    privId: 30,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-delegate-monitor",
    privName: "委托来源监控"
  },
  {
    privId: 31,
    parentPrivId: 23,
    privType: "C",
    privCode: "c-compliance-terminal-mgr",
    privName: "终端数据报备管理"
  },
  {
    privId: 32,
    parentPrivId: 31,
    privType: "M",
    privCode: "m-compliance-wait-start",
    privName: "待发起"
  },
  {
    privId: 33,
    parentPrivId: 31,
    privType: "M",
    privCode: "m-compliance-terminal-report",
    privName: "终端数据报备"
  },
  {
    privId: 34,
    parentPrivId: 31,
    privType: "M",
    privCode: "m-compliance-his-report",
    privName: "历史报备数据"
  },
  {
    privId: 35,
    parentPrivId: 23,
    privType: "M",
    privCode: "m-compliance-data-collect",
    privName: "监控结果汇总查询"
  },
  {
    privId: 21,
    parentPrivId: 4,
    privType: "M",
    privCode: "m-index-flag-management",
    privName: "指标数据录入"
  },
  {
    privId: 22,
    parentPrivId: 2,
    privType: "C",
    privCode: "c-proprietary-risk-manager",
    privName: "市场风险报告"
  },
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
  },
  {
    privId: 14,
    parentPrivId: 4,
    privType: "M",
    privCode: "m-user-management",
    privName: "用户管理"
  },
  {
    privId: 15,
    parentPrivId: 4,
    privType: "M",
    privCode: "m-role-management",
    privName: "角色管理"
  },
  {
    privId: 16,
    parentPrivId: 4,
    privType: "M",
    privCode: "m-system-config-management",
    privName: "系统配置管理"
  },
  {
    privId: 17,
    parentPrivId: 4,
    privType: "M",
    privCode: "m-data-process-log",
    privName: "数据检查日志"
  },
  {
    privId: 19,
    parentPrivId: 4,
    privType: "M",
    privCode: "m-operate-log",
    privName: "操作日志"
  },
  {
    privId: 255,
    parentPrivId: 253,
    privType: "M",
    privCode: "m-proprietary-zyysp-onexchangemgr",
    privName: "场内持仓主动管理"
  },
  {
    privId: 249,
    parentPrivId: 247,
    privType: "M",
    privCode: "m-proprietary-wwzg-structure",
    privName: "产品结构树管理"
  },
  {
    privId: 245,
    parentPrivId: 243,
    privType: "M",
    privCode: "m-risk-zjjc-expertarticle",
    privName: "专家库监测"
  },
  {
    privId: 62,
    parentPrivId: 60,
    privType: "M",
    privCode: "m-credit-main-tag",
    privName: "标签主分类管理"
  },
  {
    privId: 56,
    parentPrivId: 54,
    privType: "M",
    privCode: "m-credit-fengping-single",
    privName: "证券风评展示单页"
  },
  {
    privId: 57,
    parentPrivId: 53,
    privType: "M",
    privCode: "m-credit-zixun-fengping",
    privName: "证券资讯风评管理"
  },
  {
    privId: 51,
    parentPrivId: 49,
    privType: "M",
    privCode: "m-manual-business",
    privName: "自营业务配置"
  },
  {
    privId: 250,
    parentPrivId: 247,
    privType: "M",
    privCode: "m-proprietary-wwzg-position",
    privName: "产品持仓"
  },
  {
    privId: 246,
    parentPrivId: 243,
    privType: "M",
    privCode: "m-risk-zjjc-uploadrecord",
    privName: "导入文件管理"
  },
  {
    privId: 63,
    parentPrivId: 60,
    privType: "M",
    privCode: "m-credit-submain-tag",
    privName: "标签子分类管理"
  },
  {
    privId: 58,
    parentPrivId: 53,
    privType: "M",
    privCode: "m-credit-gonggao-fengping",
    privName: "证券公告风评管理"
  },
  {
    privId: 251,
    parentPrivId: 247,
    privType: "M",
    privCode: "m-proprietary-wwzg-lastyearnetvalue",
    privName: "上年年末资产净值配置"
  },
  {
    privId: 59,
    parentPrivId: 53,
    privType: "M",
    privCode: "m-credit-pingfen",
    privName: "证券评分管理"
  },
  {
    privId: 64,
    parentPrivId: 60,
    privType: "M",
    privCode: "m-credit-tag",
    privName: "标签管理"
  },
  {
    privId: 49,
    parentPrivId: 2,
    privType: "C",
    privCode: "m-manual-config-entry",
    privName: "手工配置"
  },
  {
    privId: 252,
    parentPrivId: 247,
    privType: "M",
    privCode: "m-proprietary-wwzg-custodiantemplate",
    privName: "托管人及模板管理"
  },
  {
    privId: 60,
    parentPrivId: 53,
    privType: "C",
    privCode: "c-credit-tag-mgr",
    privName: "标签管理"
  },
  {
    privId: 65,
    parentPrivId: 60,
    privType: "M",
    privCode: "m-credit-color-mgr",
    privName: "标签色值管理"
  },
  {
    privId: 256,
    parentPrivId: 49,
    privType: "M",
    privCode: "m-proprietary-manual-widebase",
    privName: "宽基名单管理"
  },
  {
    privId: 66,
    parentPrivId: 60,
    privType: "M",
    privCode: "m-credit-batch-tag",
    privName: "批量导入标签管理"
  },
  {
    privId: 68,
    parentPrivId: 60,
    privType: "C",
    privCode: "c-credit-strategy-mgr",
    privName: "策略管理"
  },
  {
    privId: 67,
    parentPrivId: 60,
    privType: "M",
    privCode: "m-credit-batch-delete-tag",
    privName: "批量删除标签管理 (导入)"
  }
];
