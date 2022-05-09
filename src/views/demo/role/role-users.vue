<template>
  <div style="padding: 0 0 15px 0">
    <el-button type="primary" icon="plus" @click="handleAddUsers"
      >添加用户</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="realName" label="姓名" />
      <el-table-column prop="sysFlag" label="系统管理员">
        <template #default="{ row }">
          {{ row.sysFlag === SystemFlag.yes ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            type="danger"
            @click="handleDel(row)"
            icon="Delete"
          />
          <el-button
            circle
            type="primary"
            @click="handleEdit(row)"
            icon="Edit"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      v-model:current-page="currPage"
      :page-size="pageSize"
      :total="total"
      style="margin-top: 15px; justify-content: flex-end"
    />
    <modal-role-users ref="modalRoleUsersRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { RoleRow } from "./roles.vue";
import { getRoleUsers } from "/@/api/role";
import ModalRoleUsers from "./components/modal-role-users.vue";

enum SystemFlag {
  yes = "1",
  no = "0"
}

export default defineComponent({
  components: {
    ModalRoleUsers
  },
  setup(_, { expose }) {
    const tableData = ref([]);
    const currPage = ref(1);
    const pageSize = 20;
    const total = ref(0);
    let _roleId = null;
    const modalRoleUsersRef = ref<InstanceType<typeof ModalRoleUsers>>(null);
    const handleDel = (row: object) => {
      console.log(row);
    };
    const handleEdit = (row: object) => {
      console.log(row);
    };
    const handleAddUsers = () => {
      modalRoleUsersRef.value?.show(_roleId);
    };
    const getRoleUsersList = async (roleId: number) => {
      const data = await getRoleUsers(roleId, {
        currPage: currPage.value,
        pageSize: pageSize
      });
      if (data && data.success) {
        tableData.value = data.data.list;
        total.value = data.data.totalCount;
      }
    };
    const handleAddUsersSucess = () => {
      getRoleUsersList(_roleId);
    };
    const getUsersData = (role: RoleRow) => {
      _roleId = role.roleId;
      getRoleUsersList(role.roleId);
    };
    watch(currPage, () => {
      getRoleUsersList(_roleId);
    });
    expose({
      getRoleUsersData: getUsersData
    });
    return {
      tableData,
      SystemFlag,
      currPage,
      pageSize,
      total,
      modalRoleUsersRef,
      handleDel,
      handleEdit,
      handleAddUsers,
      handleAddUsersSucess
    };
  }
});
</script>
