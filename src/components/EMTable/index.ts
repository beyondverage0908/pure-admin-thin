import {
  defineComponent,
  h,
  getCurrentInstance,
  toRefs,
  ref,
  VNode,
  resolveComponent
} from "vue";
import { ElTable, ElPagination } from "element-plus";

interface Emits {
  (e: "page-change", v: { pageSize: number; page: number }): void;
}

// 定义暴露给组件外部方法的定义
export type EmTablePublicInstance = {
  getTableInstance: () => InstanceType<typeof ElTable>;
};

const INNER_TABLE_REF = "innerTableRef";

const EmTable = defineComponent({
  inheritAttrs: false, // 根节点没必要继承属性
  props: {
    total: {
      type: Number,
      default: () => 0
    }
  },
  emits: ["page-change"],
  setup(props, { expose, emit }) {
    const currInstance = getCurrentInstance();

    // 获取table的实例方法
    const tableInstance = () => {
      const tableInstance = currInstance.refs[INNER_TABLE_REF] as InstanceType<
        typeof ElTable
      >;
      return tableInstance;
    };
    const publicInstance: EmTablePublicInstance = {
      getTableInstance: tableInstance
    };
    // 组件实例暴露的方法列表
    expose(publicInstance);

    return instance => {
      const ToolBar = createToolBar(instance);
      const Main = createMainContainer(instance);
      const FooterBar = createFooterbar(instance, props, emit);
      return h("div", [ToolBar, Main, FooterBar]);
    };
  }
});
// 创建toolbar区域
const createToolBar = (instance: any): VNode => {
  const toolbarLeft = instance.$slots.toolbarLeft
    ? instance.$slots.toolbarLeft()
    : h("div");
  const toolbarRight = instance.$slots.toolbarRight
    ? instance.$slots.toolbarRight()
    : null;
  const Button = resolveComponent("el-button");
  const toolbarRightDefaultAction = h(
    Button,
    {
      type: "warning"
    },
    () => "列筛选"
  );
  return h(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px"
      }
    },
    [
      h("div", [toolbarLeft]),
      h("div", [toolbarRight, toolbarRightDefaultAction])
    ]
  );
};
// 创建列表区域
const createMainContainer = (instance: any): VNode => {
  console.log(instance.$slots.default());
  return h(
    ElTable,
    {
      ...instance.$attrs,
      ref: INNER_TABLE_REF
    },
    () => instance.$slots.default()
  );
};
// 创建footerbar区域
const createFooterbar = (instance: any, props, emit: Emits): VNode => {
  const { total } = toRefs(props);
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(20);
  const Pagination = h(ElPagination, {
    background: true,
    layout: "total, sizes, prev, pager, next",
    total: total.value,
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    pageSizes: [20, 40, 50, 100],
    defaultPageSize: 20,
    pagerCount: 5,
    onCurrentChange: v => {
      currentPage.value = v;
      emit("page-change", {
        pageSize: pageSize.value,
        page: currentPage.value
      });
    },
    onSizeChange: v => {
      pageSize.value = v;
      emit("page-change", {
        pageSize: pageSize.value,
        page: currentPage.value
      });
    }
  });
  return h(
    "div",
    {
      style: {
        display: "flex",
        "justify-content": "flex-end",
        "margin-top": "15px"
      }
    },
    Pagination
  );
};

export default EmTable;
