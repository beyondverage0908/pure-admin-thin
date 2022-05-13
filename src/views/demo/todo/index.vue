<template>
  <div>
    <el-row type="flex" justify="end" style="margin-bottom: 8px">
      <em-columns-filter
        :columns="columns"
        @columns-filter="handleColumnsFilter"
      />
    </el-row>
    <dynamic-height v-slot="{ height }">
      <el-table
        ref="multipleTableRef"
        :height="height"
        :data="tableData"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
        @cell-click="handleCleckCell"
      >
        <el-table-column type="selection" />
        <el-table-column
          v-for="item in columns"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        />
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])"
          >Toggle selection status of second and third rows</el-button
        >
        <el-button @click="toggleSelection()">Clear selection</el-button>
      </div>
    </dynamic-height>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { ElTable } from "element-plus";
import EmColumnsFilter from "/@/components/EMColumnsFilter";
import DynamicHeight from "/@/components/DynamicHeight";

interface Column {
  label: string;
  prop: string;
  show?: boolean;
}

interface User {
  date: string;
  name: string;
  address: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach(row => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const handleCleckCell = () => {};

const columns = ref<Array<Column>>([
  { label: "Date", prop: "date", show: true },
  { label: "Name", prop: "name" },
  { label: "Address", prop: "address", show: false },
  { label: "籍贯", prop: "jiguan" }
]);
const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom1",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom2",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom3",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom4",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-08",
    name: "Tom5",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-06",
    name: "Tom6",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-07",
    name: "Tom7",
    address: "No. 189, Grove St, Los Angeles"
  }
];

const handleColumnsFilter = (filterColumns: Column[]) => {
  console.log(filterColumns);
  columns.value = filterColumns.filter(item => item.show);
};
</script>
