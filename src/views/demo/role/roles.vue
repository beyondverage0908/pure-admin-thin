<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="roleName" label="角色名称" width="180" />
    <el-table-column prop="remark" label="角色备注" width="180" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button circle type="danger" @click="handleDel(row)" icon="Delete" />
        <el-button circle type="primary" @click="handleEdit(row)" icon="Edit" />
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="visiable" width="40%" title="编辑">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :label-position="'top'"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item label="角色备注">
        <el-input v-model="form.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visiable = false">取消</el-button>
      <el-button type="primary" @click="handleConfirmEdit">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { getRoles, deleteRole } from "/@/api/app";
import { ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

export default defineComponent({
  setup() {
    const tableData = ref([]);
    const totalCount = ref(0);
    const visiable = ref(false);
    const ruleFormRef = ref<FormInstance>();
    const form = reactive({
      roleName: "",
      remark: ""
    });
    const rules = reactive<FormRules>({
      roleName: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur"
        }
      ]
    });
    // 获取角色
    const getCurrentSystemRoles = async () => {
      const data = await getRoles({ currPage: 1, pageSize: 20 });
      if (data && data.success) {
        tableData.value = data.data.list;
        totalCount.value = data.data.totalCount;
      }
    };
    getCurrentSystemRoles();

    const deleteAppRole = async (roleId: number) => {
      const data = await deleteRole(roleId);
      if (data && data.success) {
        getCurrentSystemRoles();
      }
    };

    const handleDel = (row: { roleId: number }) => {
      ElMessageBox.confirm("确定要删除当前角色吗？")
        .then(() => {
          deleteAppRole(row.roleId);
        })
        .catch(() => {
          console.log("取消");
        });
    };

    const handleConfirmEdit = async () => {
      if (!ruleFormRef.value) return;
      console.log(ruleFormRef);
      await ruleFormRef.value.validate((valid, fields) => {
        console.log(valid, fields);
      });
      // if (validate) {
      //   visiable.value = false;
      // }
      debugger;
    };

    const handleEdit = (row: {
      roleId: number;
      roleName: string;
      remark?: string;
    }) => {
      visiable.value = true;
      console.log(row);
    };

    return {
      visiable,
      tableData,
      totalCount,
      ruleFormRef: ruleFormRef,
      form,
      rules,
      handleDel,
      handleEdit,
      handleConfirmEdit
    };
  }
});
</script>
