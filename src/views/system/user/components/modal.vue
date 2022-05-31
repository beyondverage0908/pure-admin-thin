<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { UserRow, SysFlag } from "../type";
import type { FormRules, FormInstance } from "element-plus";
import { successMessage } from "/@/utils/message";
import { addUser, editUser } from "/@/api/user";

const visiable = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>(null);
let form = reactive<{ user: UserRow }>({
  user: {
    sysFlag: SysFlag.enable
  }
});
const rules = reactive<FormRules>({
  userName: [{ required: true, message: "不能为空", trigger: "blur" }],
  realName: [{ required: true, message: "不能为空", trigger: "blur" }],
  phone: [{ required: true, message: "不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "不能为空", trigger: "blur" },
    { type: "email", message: "请按邮箱格式填写", trigger: "blur" }
  ],
  userPwd: [{ required: true, message: "不能为空", trigger: "blur" }]
});
const sysFlagLabelList = ref([
  { label: "禁用", value: SysFlag.disabled },
  { label: "启用", value: SysFlag.enable }
]);

interface Emits {
  (e: "submit", v: boolean): void;
}
const emit = defineEmits<Emits>();

const isEdit = computed(() => !!form.user.userId);
const title = computed(() => {
  if (isEdit.value) {
    return "用户编辑";
  }
  return "用户新增";
});

const hide = () => {
  form.user = {
    sysFlag: SysFlag.enable
  };
  visiable.value = false;
};
const show = (row?: UserRow) => {
  if (row) form.user = row;
  visiable.value = true;
};

const handleAddUser = async () => {
  const data = await addUser(form.user);
  if (data && data.success) {
    emit("submit", true);
    hide();
    successMessage("添加用户成功");
  }
};
const handleEditUser = async () => {
  const data = await editUser(form.user.userId, form.user);
  if (data && data.success) {
    emit("submit", true);
    hide();
    successMessage("编辑用户成功");
  }
};

const handleSubmit = async (formInstance: FormInstance | undefined) => {
  if (!formInstance) return;
  await ruleFormRef.value.validate(valid => {
    if (!valid) {
      return;
    }
    if (isEdit.value) {
      handleEditUser();
    } else {
      handleAddUser();
    }
  });
};

defineExpose({
  show
});
</script>
<template>
  <el-dialog v-model="visiable" :title="title" destroy-on-close :width="600">
    <el-form
      ref="ruleFormRef"
      :model="form.user"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="用户名" prop="userName" v-if="!isEdit">
        <el-input v-model="form.user.userName" />
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.user.realName" />
      </el-form-item>
      <el-form-item label="密码" prop="userPwd" v-if="!isEdit">
        <el-input v-model="form.user.userPwd" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.user.phone" />
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="form.user.email" />
      </el-form-item>
      <el-form-item label="是否禁用" prop="sysFlag">
        <el-radio-group v-model="form.user.sysFlag">
          <el-radio
            v-for="item in sysFlagLabelList"
            :label="item.value"
            :key="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="text" @click="() => (visiable = false)">取消</el-button>
      <el-button type="primary" @click="handleSubmit(ruleFormRef)"
        >提交</el-button
      >
    </template>
  </el-dialog>
</template>
