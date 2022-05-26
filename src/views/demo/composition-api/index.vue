<script setup lang="ts">
import { ref } from "vue";

function getColumns() {
  return Array.from({ length: Date.now() % 30 }, (_, i) => ({
    name: "李白" + i,
    age: 1065 + i,
    jiguan: "中国唐朝人"
  }));
}
const columns = getColumns();

const data = ref(columns);
const isLoading = ref(false);
const total = ref<number>(columns.length);

const handleRefresh = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    data.value = getColumns();
    total.value = data.value.length;
  }, 1500);
};
const handlePageChange = () => {
  handleRefresh();
};
</script>

<template>
  <div>
    <em-table
      :data="data"
      @page-change="handlePageChange"
      v-loading="isLoading"
      :total="total"
    >
      <template #toolbarLeft>
        <el-button icon="RefreshRight" @click="handleRefresh">刷新</el-button>
      </template>
      <el-table-column type="selection" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="年龄" prop="age" />
      <el-table-column label="籍贯" prop="jiguan" />
    </em-table>
  </div>
</template>
