<template>
  <div>
    <PrivTree :data-source="privCodes" v-model="checkedKeys" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import PrivTree from "/@/components/PrivTree";
import { useAppStoreHook } from "/@/store/modules/app";
export default defineComponent({
  components: {
    PrivTree
  },
  setup(_, { expose }) {
    const checkedKeys = ref([]);
    const appStore = useAppStoreHook();
    const { privCodes } = storeToRefs(appStore);
    const getAppPrivs = () => {
      appStore.getAppPrivs();
    };
    expose({
      getPrivs: getAppPrivs
    });
    return {
      privCodes,
      checkedKeys
    };
  }
});
</script>
