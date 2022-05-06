<template>
  <div class="role-list">
    <div class="header">
      <el-button type="primary" icon="Plus" @click="handleAddRole"
        >添加角色</el-button
      >
    </div>
    <el-table
      ref="tableRef"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      :row-style="{ cursor: 'pointer' }"
      @row-click="handleRowClick"
    >
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="remark" label="角色备注" />
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
      style="margin-top: 15px; justify-content: flex-end"
      background
      layout="total, prev, pager, next"
      v-model:currentPage="currPage"
      v-model:page-size="pageSize"
      :total="totalCount"
    />
    <el-dialog v-model="visiable" width="40%" title="编辑">
      <el-form
        ref="ruleFormRef"
        :model="form"
        :label-position="'top'"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visiable = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, onMounted } from "vue";
import { getRoles, deleteRole, editRole, addRole } from "/@/api/role";
import { ElMessageBox } from "element-plus";
import type { FormInstance, FormRules, ElTable } from "element-plus";

export interface RoleRow {
  roleId: number;
  roleName: string;
  remark?: string;
}

enum EditMode {
  add = "1",
  edit = "2"
}

export default defineComponent({
  emits: ["on-role-change"],
  setup(props, { emit }) {
    const tableData = ref([]);
    const totalCount = ref(0);
    const pageSize = ref(20);
    const currPage = ref(1);
    const visiable = ref(false);
    const ruleFormRef = ref<FormInstance>();
    const tableRef = ref<InstanceType<typeof ElTable>>();
    let currentEditRow: RoleRow = null;
    let editMode: EditMode = EditMode.add;
    let form = reactive({
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
      const data = await getRoles({
        currPage: currPage.value,
        pageSize: pageSize.value
      });
      if (data && data.success) {
        tableData.value = data.data.list;
        totalCount.value = data.data.totalCount;
      }
    };
    onMounted(async () => {
      await getCurrentSystemRoles();
      if (tableData.value && tableData.value.length) {
        const firstRow: RoleRow = tableData.value[0];
        tableRef.value!.setCurrentRow(firstRow);
        emit("on-role-change", firstRow);
      }
    });

    // 分页的改变建议通过监听page的变化实现数据重新获取
    watch(currPage, () => {
      getCurrentSystemRoles();
    });

    const resetFrom = () => {
      form.roleName = "";
      form.remark = "";
      currentEditRow = null;
    };

    // 添加角色
    const handleAddRole = () => {
      resetFrom();
      visiable.value = true;
      editMode = EditMode.add;
    };

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

    const editCurrentRole = async (
      roleId: number,
      params: { roleName: string; remark: string }
    ) => {
      const data = await editRole(roleId, params);
      return data.data;
    };

    const handleConfirm = async () => {
      if (!ruleFormRef.value) return;
      await ruleFormRef.value.validate(async valid => {
        if (!valid) {
          return;
        }
        if (editMode === EditMode.edit) {
          const updatedRole = await editCurrentRole(currentEditRow.roleId, {
            roleName: form.roleName,
            remark: form.remark
          });
          if (updatedRole) {
            visiable.value = false;
          }
          return;
        }
        if ((editMode = EditMode.add)) {
          const data = await addRole({
            roleName: form.roleName,
            remark: form.remark
          });
          if (data && data.success) {
            visiable.value = false;
          }
        }
      });
    };

    const handleEdit = (row: RoleRow) => {
      visiable.value = true;
      currentEditRow = row;
      form.roleName = row.roleName;
      form.remark = row.remark;
      editMode = EditMode.edit;
    };

    const handleRowClick = (row: RoleRow) => {
      emit("on-role-change", row);
    };

    return {
      visiable,
      tableData,
      totalCount,
      pageSize,
      currPage,
      ruleFormRef: ruleFormRef,
      form,
      rules,
      tableRef,
      handleAddRole,
      handleDel,
      handleEdit,
      handleConfirm,
      handleRowClick
    };
  }
  // mounted() {
  //   // this.tableRef.value!.setCurrentRow();
  //   console.log(this.tableRef);
  // }
});
</script>
<style scoped lang="scss">
.role-list {
  background-color: #fff;
  padding: 0 0 15px 0;

  .header {
    padding: 10px 0 0 10px;
  }
}
</style>
