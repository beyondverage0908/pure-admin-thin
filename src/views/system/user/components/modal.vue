<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { UserRow, SysFlag } from "../type";
import type { FormRules, FormInstance } from "element-plus";
const visiable = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>(null);
let user = reactive<UserRow>({
  sysFlag: SysFlag.enable
} as UserRow);
const rules = reactive<FormRules>({
  userName: [{ required: true, message: "不能为空", trigger: "blur" }],
  realName: [{ required: true, message: "不能为空", trigger: "blur" }],
  phone: [{ required: true, message: "不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "不能为空", trigger: "blur" },
    { type: "email", message: "请按邮箱格式填写", trigger: "blur" }
  ]
});
const sysFlagLabelList = ref([
  { label: "禁用", value: SysFlag.disabled },
  { label: "启用", value: SysFlag.enable }
]);

interface Emits {
  (e: "submit", v: boolean): void;
}
const emit = defineEmits<Emits>();

const isEdit = computed(() => !!user);
const title = computed(() => {
  if (isEdit.value) {
    return "用户编辑";
  }
  return "用户新增";
});

const hide = () => {
  user = {
    userId: 0,
    userName: "",
    realName: "",
    sysFlag: SysFlag.enable,
    state: 1
  };
  visiable.value = false;
};
const show = (row: UserRow) => {
  if (row) user = row;
  visiable.value = true;
};
const handleSubmit = async (form: FormInstance | undefined) => {
  if (!form) return;
  await ruleFormRef.value.validate(valid => {
    if (valid) {
      console.log(user);
      emit("submit", true);
      hide();
    }
  });
};

defineExpose({
  show
});
</script>
<template>
  <el-dialog v-model="visiable" :title="title" destroy-on-close>
    <el-form ref="ruleFormRef" :model="user" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="user.userName" />
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="user.realName" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="user.phone" />
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item label="是否禁用" prop="sysFlag">
        <el-radio-group v-model="user.sysFlag">
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
