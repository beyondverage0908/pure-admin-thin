import {
  defineComponent,
  h,
  getCurrentInstance,
  toRefs,
  ref,
  VNode,
  Ref
} from "vue";
import { ElTable, ElPagination } from "element-plus";
import EmColumnsFilter from "/@/components/EMColumnsFilter";
import DynamicHeight from "/@/components/DynamicHeight";

interface Emits {
  (e: "page-change", v: { pageSize: number; page: number }): void;
  (e: "update:pageSize", v: number): void;
  (e: "update:current", v: number): void;
}

// 定义暴露给组件外部方法的定义
export type EmTablePublicInstance = {
  getTableInstance: () => InstanceType<typeof ElTable>;
};

type Column = { label: string; prop?: string; show?: boolean };

const INNER_TABLE_REF = "innerTableRef";

// 获取所有表格的列
function getTableColumns(
  defaultVNodes: Array<{
    props: Column;
  }>
) {
  return defaultVNodes.map(item => ({ ...item.props }));
}
// 暂存列过滤的状态
let _filterColumns: Column[] = [];

const EmTable = defineComponent({
  name: "EmTable",
  inheritAttrs: false, // 根节点没必要继承属性
  props: {
    total: {
      type: Number,
      default: () => 0
    },
    current: {
      // 当前页码
      type: Number,
      default: () => 1
    },
    pageSize: {
      // 分页每页的大小
      type: Number,
      default: 20
    },
    showPage: {
      // 是否展示分页
      type: Boolean,
      default: true
    },
    columnsFilterSize: {
      // 列选择器的大小
      type: String,
      default: () => "default",
      validator: (v: string) => {
        return ["small", "default", "large"].indexOf(v) > -1;
      }
    }
  },
  emits: ["page-change", "update:pageSize", "update:current"],
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

    const id = ref(Date.now());
    return instance => {
      const Main = createMainContainer(instance, props, id);
      const FooterBar = createFooterbar(instance, props, emit);
      return h("div", [Main, FooterBar]);
    };
  }
});
// 创建列表区域
const createMainContainer = (
  instance: any,
  props: any,
  id: Ref<number>
): VNode => {
  if (!instance) return;
  const toolbarLeft = instance.$slots.toolbarLeft
    ? instance.$slots.toolbarLeft()
    : h("div");
  const toolbarRight = instance.$slots.toolbarRight
    ? instance.$slots.toolbarRight()
    : null;
  const tableDefaultNodes = instance.$slots.default
    ? instance.$slots.default()
    : [];

  const columns = getTableColumns(tableDefaultNodes);

  const updateColumns = (filterColumns?: Array<Column>) => {
    _filterColumns = filterColumns ? filterColumns : [];
    /**
     * 主要是利用Vue对数据的依赖手机，来触发render函数的更新，暂无其他方式可以调用render函数
     * 在render函数被重新触发，会重新收集Table组件的slot，获取VNodes，然后通过结合filterColumns
     * 对VNodes进行筛选，动态展示列
     *
     * 如果有其他更有效的触发render函数，是一种更好的实现，否则这里会多暂存一个依赖变量
     */
    id.value = Date.now();
  };
  const { columnsFilterSize } = toRefs(props);
  const toolbarRightDefaultAction = h(EmColumnsFilter, {
    size: columnsFilterSize.value || "default",
    columns: columns,
    style: {
      marginLeft: "8px"
    },
    onColumnsFilter: filterColumns => updateColumns(filterColumns)
  });
  const Toolbar = h(
    "div",
    {
      _id: id.value,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px"
      }
    },
    [
      h("div", {}, { default: () => toolbarLeft }),
      h("div", [toolbarRight, toolbarRightDefaultAction])
    ]
  );
  // ElementPlus Table的默认插槽 - el-table-column
  let vnodes = (
    instance.$slots.default ? instance.$slots.default() : []
  ) as any[];
  if (_filterColumns) {
    const filterVnodes = vnodes.filter(node => {
      if (!node.props || node.props.label === undefined) {
        return node;
      }
      const find = _filterColumns.find(item => item.label === node.props.label);
      if (find && find.show) {
        return node;
      }
    });
    vnodes = filterVnodes;
  }
  const generateTable = (tableHgith: number) => {
    // console.log(instance.$attrs);
    const Table = h(
      ElTable,
      {
        // 动态计算出
        height: tableHgith,
        ...instance.$attrs,
        ref: INNER_TABLE_REF
      },
      () => vnodes
    );
    return Table;
  };
  const DynamicHeightTable = h(
    DynamicHeight,
    {},
    {
      default: (scope: { height: number }) => generateTable(scope.height)
    }
  );
  return h("div", {}, [Toolbar, DynamicHeightTable]);
};
// 创建footerbar区域
const createFooterbar = (instance: any, props: any, emit: Emits): VNode => {
  const { total, current, pageSize, showPage } = toRefs<{
    total: number;
    current: number;
    pageSize: number;
    showPage: boolean;
  }>(props);
  let Pagination = null;
  if (showPage.value) {
    const currentPageSize = ref(pageSize.value);
    const currentPage = ref(current.value);

    Pagination = h(ElPagination, {
      background: true,
      layout: "total, sizes, prev, pager, next",
      total: total.value,
      currentPage: currentPage.value,
      pageSize: currentPageSize.value,
      pageSizes: [10, 20, 40, 50, 100],
      defaultPageSize: currentPageSize.value,
      pagerCount: 5,
      onCurrentChange: v => {
        currentPage.value = v;
        emit("page-change", {
          pageSize: currentPageSize.value,
          page: currentPage.value
        });
        emit("update:current", current.value);
      },
      onSizeChange: v => {
        currentPageSize.value = v;
        emit("page-change", {
          pageSize: currentPageSize.value,
          page: currentPage.value
        });
        emit("update:pageSize", currentPageSize.value);
      }
    });
  }
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
