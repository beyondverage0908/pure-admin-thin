import { defineComponent, h, getCurrentInstance, toRefs, ref } from "vue";
import { ElTable, ElPagination } from "element-plus";

// 定义暴露给组件外部方法的定义
export type EMTablePublicInstance = {
  getTableInstance: () => InstanceType<typeof ElTable>;
};

const INNER_TABLE_REF = "innerTableRef";

const EMTable = defineComponent({
  props: {
    total: {
      type: Number,
      default: () => 0
    }
  },
  emits: ["page-change"],
  setup(props, { expose, emit }) {
    const { total } = toRefs(props);
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(20);
    const currInstance = getCurrentInstance();

    // 获取table的实例方法
    const tableInstance = () => {
      const tableInstance = currInstance.refs[INNER_TABLE_REF] as InstanceType<
        typeof ElTable
      >;
      return tableInstance;
    };
    const publicInstance: EMTablePublicInstance = {
      getTableInstance: tableInstance
    };
    // 组件实例暴露的方法列表
    expose(publicInstance);

    return instance => {
      // console.log(instance);
      // console.log(instance, instance.$slots.bug());
      const ToolBar = h("div", {}, "这是个toolbar");
      const Main = h(
        ElTable,
        {
          ...instance.$attrs,
          ref: INNER_TABLE_REF
        },
        () => instance.$slots.default()
      );
      const Pagination = h(ElPagination, {
        background: true,
        layout: "total, sizes, prev, pager, next",
        total: total.value,
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        pageSizes: [20, 40, 50, 100],
        defaultPageSize: 20,
        pagerCount: 5,
        style: {
          display: "flex",
          "justify-content": "flex-end",
          "margin-top": "15px"
        },
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
      const FooterBar = h("div", {}, Pagination);
      return h("div", {}, [ToolBar, Main, FooterBar]);
    };
  }
});

export default EMTable;
