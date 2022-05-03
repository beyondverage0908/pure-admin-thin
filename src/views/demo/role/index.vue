<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="8"><roles /></el-col>
      <el-col :span="16">
        <privs />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Privs from "./privs.vue";
import Roles from "./roles.vue";
export default defineComponent({
  components: {
    Roles,
    Privs
  },
  setup() {}
});
</script>
