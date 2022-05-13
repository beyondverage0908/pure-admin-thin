<template>
  <main ref="mainRef">
    <slot :height="dynamicHeight" />
  </main>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, nextTick } from "vue";

interface Emits {
  (e: "on-height", val: number): void;
}

const props = defineProps({
  footerHeight: {
    // 底部预留高度
    type: Number,
    default: () => 80
  },
  minHeight: {
    // 包容区域的最小高度
    type: Number,
    default: 350
  }
});
const emit = defineEmits<Emits>();
const mainRef = ref<HTMLElement>(null);
const dynamicHeight = ref<number>(350);

function getHeight() {
  const dom = mainRef?.value;
  let height = props.minHeight;
  if (dom) {
    // 返回元素的大小及其相对于视口的位置
    // ref: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
    const rect = dom.getBoundingClientRect();
    height = window.innerHeight - rect.top - props.footerHeight;
  }
  // 相对于Vue2.x版本，这里需要使用nextTick，可能是由于收集依赖变化的算法有变化
  // 不使用nextTick：显示minHeight数据，计算出新数据，业务层的Table有没有变化
  nextTick(() => {
    dynamicHeight.value = height > props.minHeight ? height : props.minHeight;
    emit("on-height", dynamicHeight.value);
  });
}

onMounted(() => getHeight());

window.addEventListener(
  "resize",
  () => {
    getHeight();
  },
  false
);
</script>
