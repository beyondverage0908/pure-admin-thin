<template>
  <div>
    <el-button type="primary" @click="handleSavePrivs" icon="select"
      >保存</el-button
    >
    <el-button type="default" @click="handleResetPrivs" icon="failed"
      >重置</el-button
    >
    <PrivTree :data-source="privCodes" v-model="checkedKeys" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "vue";
import { storeToRefs } from "pinia";
import PrivTree from "/@/components/PrivTree";
import { useAppStoreHook } from "/@/store/modules/app";
import { ElMessage } from "element-plus";
import { RoleRow } from "./type";
import { getRolePrivs } from "/@/api/role";
export default defineComponent({
  components: {
    PrivTree
  },
  setup(_, { expose }) {
    const checkedKeys = ref<number[]>([]);
    let resetCheckedKeys = checkedKeys.value;
    const appStore = useAppStoreHook();
    const { privCodes } = storeToRefs(appStore);
    let _role: RoleRow;

    const getRolePrivsList = async () => {
      const data = await getRolePrivs(_role.roleId);
      if (data && data.success) {
        checkedKeys.value = (data.data as Array<{ privId: number }>).map(
          item => item.privId
        );
        resetCheckedKeys = checkedKeys.value;
      }
    };

    const getAppPrivs = async (role: RoleRow) => {
      _role = role;
      await appStore.getAppPrivs();
      await getRolePrivsList();
    };
    expose({
      getPrivs: getAppPrivs
    });

    const handleSavePrivs = async () => {
      if (!checkedKeys.value || !checkedKeys.value.length) {
        return ElMessage.warning("未选择任何权限数据");
      }
      const appStore = useAppStoreHook();
      const success = await appStore.addPrivs(_role.roleId, checkedKeys.value);
      if (success) {
        ElMessage.success("权限保存保存成功");
      }
    };

    const handleResetPrivs = () => {
      checkedKeys.value = [...resetCheckedKeys, Date.now() % 345];
    };

    onActivated(() => {
      console.log("-------- be activited");
    });

    return {
      privCodes,
      checkedKeys,
      handleSavePrivs,
      handleResetPrivs
    };
  }
});
</script>
