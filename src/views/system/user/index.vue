<template>
  <div>
    <search-header @query="handleQuery" />
    <em-table
      v-loading="isLoading"
      :data="tableData"
      :total="total"
      v-model:current="currPage"
      v-model:pageSize="pageSize"
    >
      <el-table-column width="60" label="序号" type="index" />
      <el-table-column label="用户名" prop="userName" />
      <el-table-column label="姓名" prop="realName" />
      <el-table-column label="手机号" prop="phone" />
      <el-table-column label="邮箱地址" prop="email" />
      <el-table-column
        label="是否内置"
        prop="state"
        :formatter="stateFormatter"
      />
      <el-table-column label="是否禁用" prop="sysFlag">
        <template #default="{ row }">
          <el-switch
            inline-prompt
            :active-value="'1'"
            :inactive-value="'0'"
            active-text="启"
            inactive-text="禁"
            v-model="row.sysFlag"
          />
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template #default="{ row }">
          <el-button size="small" @click="handleToEdit(row)">编辑</el-button>
          <el-button size="small" @click="handleResetPassword(row)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
      <template #toolbarLeft>
        <el-button icon="plus" type="primary" @click="handleAddUser"
          >新增用户</el-button
        >
      </template>
    </em-table>
    <user-modal ref="userModalRef" @submit="handleSubmit" />
  </div>
</template>
<script setup lang="ts">
import UserModal from "./components/modal.vue";
import SearchHeader from "./components/search-header.vue";
import { UserRow, Preset } from "./type";
import { ref, onMounted, watch } from "vue";
import { getUserList, resetPassword } from "/@/api/user";
import { successMessage } from "/@/utils/message";

const tableData = ref<UserRow[]>();
const currPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const isLoading = ref<boolean>(false);
const userModalRef = ref<InstanceType<typeof UserModal>>();
let _query = null;

const stateFormatter = (user: UserRow) => {
  if (user.state === Preset.yes) {
    return "是";
  }
  if (user.state === Preset.no) {
    return "否";
  }
};

async function getUserDataList() {
  isLoading.value = true;
  const data = await getUserList({
    currPage: currPage.value,
    pageSize: pageSize.value,
    ..._query
  });
  isLoading.value = false;
  if (data && data.success) {
    tableData.value = data.data.list;
    total.value = data.data.totalCount;
  }
}

watch(currPage, v => {
  currPage.value = v;
  getUserDataList();
});

watch(pageSize, v => {
  pageSize.value = v;
  getUserDataList();
});
// 添加
const handleAddUser = () => {
  userModalRef.value.show();
};
// 编辑
const handleToEdit = (user: UserRow) => {
  userModalRef.value.show(user);
};
const handleSubmit = (result: boolean) => {
  if (result) {
    getUserDataList();
  }
};
const handleResetPassword = async (user: UserRow) => {
  const data = await resetPassword(user.userId);
  if (data && data.success) {
    successMessage("重置密码成功");
    getUserDataList();
  }
};

// 查询数据
const handleQuery = query => {
  _query = query;
  getUserDataList();
};

onMounted(() => {
  getUserDataList();
});
</script>
