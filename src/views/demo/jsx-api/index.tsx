import { defineComponent, ref } from "vue";

function getColumns() {
  return Array.from({ length: Date.now() % 30 }, (_, i) => ({
    name: "李白" + i,
    age: 1065 + i,
    jiguan: "中国唐朝人"
  }));
}

export default defineComponent({
  setup() {
    const tableData = getColumns();
    const data = ref(tableData);
    const total = ref(tableData.length);
    const isLoading = ref(false);

    const handleRefresh = () => {
      isLoading.value = true;
      setTimeout(() => {
        data.value = getColumns();
        total.value = data.value.length;
        isLoading.value = false;
      }, 1500);
    };
    const handlePageChange = () => {
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
    const columnsData = [
      { type: "selection" },
      { prop: "name", label: "姓名" },
      { prop: "age", label: "年龄" },
      { prop: "jiguan", label: "籍贯" }
    ];

    return (
      <div>
        <em-table
          data={this.data}
          total={this.total}
          vLoading={this.isLoading}
          onPageChange={this.handlePageChange}
          v-slots={{
            // 具名插槽
            toolbarLeft: () => (
              <el-button icon="RefreshRight" onClick={this.handleRefresh}>
                刷新
              </el-button>
            ),
            // 默认插槽
            default: () =>
              columnsData.map(data => (
                <el-table-column
                  type={data.type}
                  label={data.label}
                  prop={data.prop}
                ></el-table-column>
              ))
          }}
        ></em-table>
      </div>
    );
  }
});
