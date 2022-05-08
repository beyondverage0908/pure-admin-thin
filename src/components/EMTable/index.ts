import { defineComponent, h, getCurrentInstance } from "vue";
import { ElTable, ElPagination } from "element-plus";
// import type { ElTable as ElTableType } from "element-plus";
// import { dataSource } from "./mock-data";

export type EMTablePublicInstance = {
  getTableInstance: () => InstanceType<typeof ElTable>;
};

const INNER_TABLE_REF = "innerTableRef";

const EMTable = defineComponent({
  emits: ["current-change"],
  setup(_, { expose }) {
    // const slots = ctx.slots;
    // console.log(props, slots);
    // const instance = getCurrentInstance().slots;
    // return () => h(ElTable, {}, instance.default);

    // const innerTableRef = ref<InstanceType<typeof ElTable>>(null);

    const currInstance = getCurrentInstance();

    const tableInstance = () => {
      const tableInstance = currInstance.refs[INNER_TABLE_REF] as InstanceType<
        typeof ElTable
      >;
      return tableInstance;
    };

    const publicInstance: EMTablePublicInstance = {
      getTableInstance: tableInstance
    };

    expose(publicInstance);

    return instance => {
      // console.log(instance);
      console.log(instance, instance.$slots.bug());
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
        total: 231,
        // currentPage: 1,
        pageSize: 20,
        style: {
          display: "flex",
          "justify-content": "flex-end",
          "margin-top": "15px"
        },
        on: {
          "update:page-size": () => {}
        }
      });
      const FooterBar = h("div", {}, Pagination);
      return h("div", {}, [ToolBar, Main, FooterBar]);
    };
  }
});

export default EMTable;
