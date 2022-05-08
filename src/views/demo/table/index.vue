<template>
  <div>
    <EMTable
      ref="emTableRef"
      :data="tableData"
      stripe
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @cell-click="handleCleckCell"
      @on-xxx="handleXXX"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed label="姓名" prop="name">
        <template #default="{ row }">{{ row.name }}</template>
      </el-table-column>
      <el-table-column label="日期" prop="date" />
      <el-table-column label="地址" prop="address" />
      <el-table-column label="地址" prop="address" />
      <el-table-column label="操作">
        <template #default>
          <el-button a type="text" size="small" @click="handleEdit"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <template #bug>
        <b>33333</b>
      </template>
    </EMTable>
    <el-button @click="handleSelectionRow12">选中1，2行</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import EMTable, { EMTablePublicInstance } from "/@/components/EMTable";
import { ComponentPublicInstance, reactive, ref } from "vue";

const emTableRef = ref<ComponentPublicInstance<EMTablePublicInstance>>(null);

interface User {
  date: string;
  name: string;
  address: string;
}

const tableData = reactive<User[]>([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom3",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom2",
    address: "No. 189, Grove St, Los Angeles"
  }
]);
const multipleSelection = ref<User[]>([]);

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
const handleXXX = v => {
  console.log("xxxx -- ", v);
};
</script>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
