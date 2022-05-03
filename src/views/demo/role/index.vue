<template>
  <div>
    <PrivTree :data-source="privCodes" v-model="checkedKeys" />
    <el-icon><promotion /></el-icon>
    <button @click="handleClick">点击提交权限</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PrivTree from "/@/components/PrivTree";
import { useAppStoreHook } from "/@/store/modules/app";
export default defineComponent({
  components: {
    PrivTree
  },
  async setup() {
    const checkedKeys = ref([12, 13]);
    const handleClick = () => {
      console.log(checkedKeys.value);
      checkedKeys.value = [10, 11, 12, 13];
    };
    const privCodes = await useAppStoreHook().getAppPrivs();
    return {
      handleClick,
      checkedKeys,
      privCodes
    };
  }
});
</script>
