<script lang="ts">
import {
  ref,
  h,
  defineComponent,
  resolveComponent,
  resolveDirective,
  withDirectives
} from "vue";

function getColumns() {
  return Array.from({ length: Date.now() % 30 }, (_, i) => ({
    name: "李白" + i,
    age: 1065 + i,
    jiguan: "中国唐朝人"
  }));
}

export default defineComponent({
  setup() {
    const columns = getColumns();
    const data = ref(columns);
    const total = ref(columns.length);
    const isLoading = ref(false);
    const handleRefresh = () => {
      isLoading.value = true;
      setTimeout(() => {
        data.value = getColumns();
        isLoading.value = false;
      }, 1500);
    };
    const handlePageChange = page => {
      console.log(page);
      handleRefresh();
    };
    return {
      data,
      total,
      isLoading,
      handleRefresh,
      handlePageChange
    };
  },
  render() {
    const EmTable = resolveComponent("EmTable") as any;
    const ElTableColumn = resolveComponent("el-table-column");
    const ElButton = resolveComponent("el-button");
    const VLoading = resolveDirective("loading");
    const elTableColumns = [
      { type: "selection" },
      { prop: "name", label: "姓名" },
      { prop: "age", label: "年龄" },
      { prop: "jiguan", label: "籍贯" }
    ].map(item => h(ElTableColumn, { ...item }));

    const createEmTable = () =>
      h(
        EmTable,
        {
          data: this.data,
          total: this.total,
          onPageChange: page => this.handlePageChange(page)
        },
        {
          default: () => elTableColumns,
          toolbarLeft: () =>
            h(
              ElButton,
              {
                icon: "RefreshRight",
                onClick: () => this.handleRefresh()
              },
              () => "刷新"
            )
        }
      );
    const table = withDirectives(createEmTable(), [[VLoading, this.isLoading]]);

    return h("div", {}, table);
  }
});
</script>
