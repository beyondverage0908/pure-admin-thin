<template>
  <div>
    <dynamic-height v-slot="{ height }">
      {{ height }}
      <em-table
        :height="height"
        ref="emTableRef"
        :data="tableData"
        stripe
        :row-class-name="tableRowClassName"
        :total="tableTotalCount"
        :show-page="true"
        v-model:pageSize="pageSize"
        :columns-filter-size="'default'"
        @selection-change="handleSelectionChange"
        @cell-click="handleCleckCell"
        @page-change="handlePageChange"
      >
        <template #toolbarLeft>
          <el-button type="primary" @click="handleRefreshTable"
            >刷新列表1</el-button
          >
          <el-button type="primary" @click="handleRefreshTable"
            >刷新列表2</el-button
          >
        </template>
        <template #toolbarRight>
          <el-button type="warning" size="large">导出按钮1</el-button>
          <el-button type="success">导出按钮2</el-button>
        </template>
        <el-table-column type="selection" width="55" />
        <el-table-column fixed label="姓名" prop="name">
          <template #default="{ row }">{{ row.name + "-林" }}</template>
        </el-table-column>
        <el-table-column label="日期" key="date1" prop="date" />
        <el-table-column label="地址" prop="address" />
        <el-table-column label="地址1" prop="address" />
        <el-table-column label="操作">
          <template #default>
            <el-button a type="text" size="small" @click="handleEdit"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </em-table>
      <el-button @click="handleSelectionRow12">选中1，2行</el-button>
    </dynamic-height>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import EmTable, { EmTablePublicInstance } from "/@/components/EMTable";
import DynamicHeight from "/@/components/DynamicHeight/index.vue";
import { ComponentPublicInstance, ref, watch } from "vue";
const pageSize = ref(40);
const emTableRef = ref<ComponentPublicInstance<EmTablePublicInstance>>(null);

interface User {
  date: string;
  name: string;
  address: string;
}

watch(pageSize, n => {
  console.log("watch ---------->> ", n);
});

const tableData = ref<User[]>(
  Array.from({ length: 10 }, (_, i) => {
    return {
      date: "2016-05-03",
      name: `Tom${i}`,
      address: "No. 189, Grove St, Los Angeles"
    };
  })
);
const multipleSelection = ref<User[]>([]);
const tableTotalCount = ref<number>(tableData.value.length);

const handleEdit = () => {
  ElMessageBox.alert("edit", "title");
};

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
};

const handleSelectionChange = (selection: User[]) => {
  // console.log("--->>> ", selection);
  multipleSelection.value = selection;
};
const handleSelectionRow12 = () => {
  const table = emTableRef.value?.getTableInstance();
  // table.clearSelection();
  console.log(table.getSelectionRows());
};
const handleCleckCell = () => {
  console.log("cell be click!!");
};
const handlePageChange = v => {
  console.log("page change -- ", v);
};
function handleRefreshTable() {
  const num = Date.now() % 50;
  tableData.value = Array.from({ length: num }, (_, index) => ({
    date: "2016-05-03",
    name: `Tom${index}`,
    address: "No. 189, Grove St, Los Angeles"
  }));
  tableTotalCount.value = num;
}
</script>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
