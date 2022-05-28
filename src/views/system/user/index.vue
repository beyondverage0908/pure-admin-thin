<template>
  <div>
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
      <template #toolbarLeft>
        <el-button icon="plus" type="primary" @click="handleAddUser"
          >新增用户</el-button
        >
      </template>
    </em-table>
    <user-modal ref="userModalRef" />
  </div>
</template>
<script setup lang="ts">
import UserModal from "./components/modal.vue";
import { UserRow, Preset } from "./type";
import { ref, onMounted, watch } from "vue";
import { getUserList } from "/@/api/user";
const tableData = ref<UserRow[]>();
const currPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const isLoading = ref<boolean>(false);
const userModalRef = ref<InstanceType<typeof UserModal>>();

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
    pageSize: pageSize.value
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

const handleAddUser = () => {
  userModalRef.value.show();
};

onMounted(() => {
  getUserDataList();
});
</script>
