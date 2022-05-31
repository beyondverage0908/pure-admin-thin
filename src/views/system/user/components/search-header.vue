<script setup lang="ts">
import { reactive } from "vue";
import { UserRow } from "../type";

const data = reactive<{ form: UserRow }>({
  form: {}
});

interface Emits {
  (e: "query", v: object): void;
}
const emit = defineEmits<Emits>();

const handleQuery = () => {
  emit("query", data.form);
};
const handleClear = () => {
  data.form = {};
  emit("query", data.form);
};
</script>

<template>
  <div>
    <el-form :model="data.form" inline>
      <el-form-item label="用户名" prop="userName">
        <el-input placeholder="请输入" v-model="data.form.userName" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入" v-model="data.form.phone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handleClear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
