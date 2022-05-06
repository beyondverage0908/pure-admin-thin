<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="8"><roles @on-role-change="handleRoleChange" /></el-col>
      <el-col :span="16" style="background-color: #fff">
        <el-tabs v-model="tabName">
          <el-tab-pane label="角色用户" :name="TabNames.roleNames"
            ><role-users ref="roleUsersRef"
          /></el-tab-pane>
          <el-tab-pane label="角色权限" :name="TabNames.rolePrivs"
            ><privs ref="privsRef"
          /></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Privs from "./privs.vue";
import Roles, { RoleRow } from "./roles.vue";
import RoleUsers from "./role-users.vue";
enum TabNames {
  roleNames = "1",
  rolePrivs = "2"
}
export default defineComponent({
  components: {
    Roles,
    Privs,
    RoleUsers
  },
  setup() {
    const tabName = ref(TabNames.roleNames);
    const roleUsersRef = ref<typeof RoleUsers>(null);
    const privsRef = ref<typeof Privs>(null);
    const handleRoleChange = (role: RoleRow) => {
      roleUsersRef.value?.getUsersData(role);
      privsRef.value?.getPrivs();
    };

    return {
      tabName,
      TabNames,
      roleUsersRef,
      privsRef,
      handleRoleChange
    };
  }
});
</script>
