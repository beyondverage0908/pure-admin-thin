import { h, defineComponent, ref, resolveComponent, watch } from "vue";
import type { ElTree } from "element-plus";
// import type Node from "element-plus/es/components/tree/src/model/node";
// import { dataSource } from "./data-source";

export interface Tree {
  id: number;
  label: string;
  code?: string;
  parentId?: number;
  children?: Tree[];
}
/**
 * 事件枚举
 */
enum EmitEvent {
  updateModalValue = "update:modelValue"
}

/**
 * 设置节点是否选中
 * @param ref: 设置tree的实例
 * @param keys: 节点的key
 * @param isChecked
 */
const setCheckedByKeys = (ref: any, keys: number[], isChecked = true) => {
  keys.forEach(key => ref!.setChecked(key, isChecked, true));
};

let _treeRef = null;
// 定义组件
const PrivTree = defineComponent({
  name: "PrivTree",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  emits: [EmitEvent.updateModalValue],
  setup() {
    const treeRef = ref<InstanceType<typeof ElTree>>();
    // const treeDataSource = reactive(dataSource);
    _treeRef = treeRef;
    return {
      // treeDataSource,
      treeRef
    };
  },
  mounted() {
    const treeRef = this.treeRef;
    watch(
      () => this.modelValue,
      newKeys => {
        // 先设置空
        treeRef!.setCheckedKeys([], false);
        setCheckedByKeys(treeRef, newKeys);
      }
    );
    // 在mounted的方法中，默认是指外部数据的
    setCheckedByKeys(treeRef, this.modelValue);
  },
  render() {
    // 为什么在后续使用treeRef中不需要使用treeRef.value的方式进行展开，可能是因为render函数作为模板的渲染，会进行自动展开处理
    const treeRef = this.treeRef;
    /**
     * 通过nodekey设置节点是否被选中
     */
    const setCheckedByKeys = (nodeKeys: number[], isChecked: boolean) => {
      if (!nodeKeys) return;
      nodeKeys.forEach(key => treeRef!.setChecked(key, isChecked, true));
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
        const parentNode = treeRef!.getNode(node.parentId);
        getParentKeys(parentNode.data as Tree);
      }
      getParentKeys(treeNode);
      return keys;
    };
    const emitEvent = () => {
      const keys = treeRef.getCheckedKeys();
      this.$emit(EmitEvent.updateModalValue, keys);
    };
    /**
     * checkbox check事件
     * @param node
     * @param param1
     */
    const check = (node: Tree, { checkedKeys }: { checkedKeys: number[] }) => {
      // 当前节点选中状态
      const isChecked = checkedKeys.includes(node.id);
      const childrenNodeKeys = getAllChildrenKeys(node);
      const parentNodeKeys = getAllParentKeys(node);
      setCheckedByKeys(childrenNodeKeys, isChecked);
      if (isChecked) {
        setCheckedByKeys(parentNodeKeys, true);
      }
      emitEvent();
    };
    const ElIcon = resolveComponent("ElIcon");
    const Tickets = h(resolveComponent("Tickets"));
    const Link = h(resolveComponent("Link"));
    const renderContent = (h, { data }: { data: Tree }) => {
      return h(
        "span",
        {
          style: {
            display: "flex",
            "justify-content": "flex-start",
            "align-items": "center",
            flex: 1,
            "padding-right": "24px"
          }
        },
        [
          h(
            "span",
            {
              style: {
                width: "50%",
                display: "flex",
                alignItems: "center"
              }
            },
            [
              h(ElIcon, { style: { marginRight: "8px" } }, () => Tickets),
              data.label
            ]
          ),
          data.code
            ? h(
                "span",
                {
                  style: {
                    display: "flex",
                    width: "50%",
                    alignItems: "center"
                  }
                },
                [
                  h(ElIcon, { style: { marginRight: "8px" } }, () => Link),
                  data.code || ""
                ]
              )
            : null
        ]
      );
    };
    const TreeHead = h(
      "div",
      {
        style: {
          backgroundColor: "#fff",
          padding: "5px 0",
          marginBottom: "8px",
          borderBottom: "1px #eee solid"
        }
      },
      [
        h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "50%",
              paddingLeft: "15px"
            }
          },
          "权限名称"
        ),
        h(
          "span",
          {
            style: {
              display: "inline-block",
              widht: "50%"
            }
          },
          "权限编码"
        )
      ]
    );
    const ETree = resolveComponent("ElTree");
    const PTree = h(ETree, {
      ref: "treeRef",
      nodeKey: "id",
      data: this.dataSource,
      showCheckbox: true,
      defaultExpandAll: true,
      checkStrictly: true,
      checkOnClickNode: true,
      expandOnClickNode: false,
      emptyText: "当前暂无权限可配置",
      renderContent: renderContent,
      onCheck: check
    });
    return h(
      "div",
      {
        style: {
          backgroundColor: "#fff"
        }
      },
      [TreeHead, PTree]
    );
  }
});

// getCheckedKeys
export const getCheckedKeys = (): number[] => {
  if (!_treeRef) return [];
  return _treeRef.value!.getCheckedKeys();
};

export default PrivTree;
