<template>
  <div>
    <em-table
      :data="data"
      v-loading="isLoading"
      :total="total"
      @page-change="handlePageChange"
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
<script lang="ts">
import { defineComponent } from "vue";

function getColumns() {
  return Array.from({ length: Date.now() % 30 }, (_, i) => ({
    name: "李白" + i,
    age: 1065 + i,
    jiguan: "中国唐朝人"
  }));
}

export default defineComponent({
  data() {
    const columns = getColumns();
    return {
      isLoading: false,
      data: columns,
      total: columns.length
    };
  },
  methods: {
    handleRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        const columns = getColumns();
        this.data = columns;
        this.total = columns.length;
      }, 1500);
    },
    handlePageChange(page) {
      console.log(page);
      this.handleRefresh();
    }
  }
});
</script>
