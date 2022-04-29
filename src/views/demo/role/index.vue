<template>
  <div class="custom-tree-container">
    <el-tree
      ref="treeRef"
      :data="dataSource"
      show-checkbox
      node-key="id"
      default-expand-all
      check-strictly
      check-on-click-node
      :expand-on-click-node="false"
      @check="check"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ElTree } from "element-plus";
import { ref } from "vue";
// import type Node from "element-plus/es/components/tree/src/model/node";

interface Tree {
  id: number;
  label: string;
  parentId?: number;
  children?: Tree[];
}

const treeRef = ref<InstanceType<typeof ElTree>>();
/**
 * 利用check事件，构建树节点的非全约束关系
 * @param node
 * @param param1
 */
const check = (node: Tree, { checkedKeys }) => {
  console.log(node);
  // 当前节点选中状态
  const isChecked = (checkedKeys as number[]).includes(node.id);
  const childrenNodeKeys = getAllChildrenKeys(node);
  const parentNodeKeys = getAllParentKeys(node);
  setCheckedByKeys(childrenNodeKeys, isChecked);
  if (isChecked) {
    setCheckedByKeys(parentNodeKeys, true);
  }
};
/**
 * 通过nodekey设置节点是否被选中
 */
const setCheckedByKeys = (nodeKeys: number[], isChecked: boolean) => {
  if (!nodeKeys) return;
  nodeKeys.forEach(key => treeRef.value!.setChecked(key, isChecked, true));
};

/**
 * 获取当前节点下的所有子节点列表
 */
const getAllChildrenKeys = (treeNode: Tree): number[] => {
  const keys: number[] = [];
  function getChildrenKeys(node: Tree) {
    if (!node.children || !node.children.length) return;
    node.children.forEach(tree => {
      keys.push(tree.id);
      if (tree.children) getChildrenKeys(tree);
    });
  }
  getChildrenKeys(treeNode);
  return keys;
};
/**
 * 获取当前节点的所有父节点
 */
const getAllParentKeys = (treeNode: Tree): number[] => {
  const keys: number[] = [];
  function getParentKeys(node: Tree) {
    if (node.parentId === undefined || node.parentId === null) return;
    keys.push(node.parentId);
    const parentNode = treeRef.value!.getNode(node.parentId);
    getParentKeys(parentNode.data as Tree);
  }
  getParentKeys(treeNode);
  return keys;
};

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        parentId: 1,
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
            parentId: 4
          },
          {
            id: 10,
            label: "Level three 1-1-2",
            parentId: 4,
            children: [
              { id: 11, label: "Level Four 1-1-1-1", parentId: 10 },
              { id: 12, label: "Level Four 1-1-1-2", parentId: 10 },
              { id: 13, label: "Level Four 1-1-1-4", parentId: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
        parentId: 2
      },
      {
        id: 6,
        label: "Level two 2-2",
        parentId: 2
      }
    ]
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
        parentId: 3
      },
      {
        id: 8,
        label: "Level two 3-2",
        parentId: 3
      }
    ]
  }
]);
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
