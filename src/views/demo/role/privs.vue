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
  setup() {
    const checkedKeys = ref([12, 13]);
    const handleClick = () => {
      checkedKeys.value = [10, 11, 12, 13];
    };
    const appStore = useAppStoreHook();
    appStore.getAppPrivs();
    return {
      handleClick,
      checkedKeys,
      appStore
    };
  },
  computed: {
    privCodes() {
      return this.appStore.privCodes;
    }
  }
});
</script>
