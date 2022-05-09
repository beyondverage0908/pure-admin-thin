<template>
  <el-dialog
    title="添加角色用户"
    v-model="visiable"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-table :data="tableData" @selection-change="handleSectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="realName" label="姓名" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      v-model:current-page="currPage"
      :page-size="pageSize"
      :total="total"
      style="margin-top: 15px; justify-content: flex-end"
    />
    <template #footer>
      <el-button @click="visiable = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">提交</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { getAppendRoleUsers, appendRoleUsers } from "/@/api/role";

interface UserRow {
  userId: number;
  userName?: string;
  realName?: string;
  phone?: string;
  email?: string;
}
interface Emits {
  (e: "on-success"): void;
}

const visiable = ref(false);
const tableData = ref<UserRow[]>([]);
const pageSize = ref(20);
const currPage = ref(1);
const total = ref(0);
const selectionUserIds = ref<number[]>([]);
let _roleId: number = null;
const emit = defineEmits<Emits>();

const show = (roleId: number) => {
  visiable.value = true;
  _roleId = roleId;
  getAppendRoleUserList();
};
const hide = () => {
  visiable.value = false;
};
const handleConfirm = async () => {
  const isSuccess = await appendToRoleUsers();
  if (isSuccess) {
    hide();
    emit("on-success");
  }
};
const handleSectionChange = (rows: UserRow[]) => {
  selectionUserIds.value = rows.map(row => row.userId);
};
watch(currPage, () => {
  getAppendRoleUserList();
});
const getAppendRoleUserList = async () => {
  const data = await getAppendRoleUsers(_roleId, {
    pageSize: pageSize.value,
    currPage: currPage.value
  });
  if (data && data.success) {
    tableData.value = data.data.list;
    total.value = data.data.totalCount;
  }
};
const appendToRoleUsers = async (): Promise<boolean> => {
  const data = await appendRoleUsers(_roleId, selectionUserIds.value);
  return data.success as boolean;
};
defineExpose({
  show: show
});
</script>
