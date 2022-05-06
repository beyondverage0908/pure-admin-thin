import { h, defineComponent, ref, resolveComponent, watch } from "vue";
import type { ElTree } from "element-plus";
// import type Node from "element-plus/es/components/tree/src/model/node";
// import { dataSource } from "./data-source";
import { NetTree, PrivType } from "./util";

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

const renderIcon = (privType?: PrivType) => {
  const ElIcon = resolveComponent("ElIcon");
  const Contents = h(resolveComponent("Folder"));
  const Menu = h(resolveComponent("Tickets"));
  const Operate = h(resolveComponent("Pointer"));
  const Link = h(resolveComponent("Link"));
  if (!privType) {
    return h(ElIcon, { style: { marginRight: "8px" } }, () => Link);
  }
  let icon = null;
  switch (privType) {
    case PrivType.contents:
      icon = h(ElIcon, { style: { marginRight: "8px" } }, () => Contents);
      break;
    case PrivType.menu:
      icon = h(ElIcon, { style: { marginRight: "8px" } }, () => Menu);
      break;
    case PrivType.operation:
      icon = h(ElIcon, { style: { marginRight: "8px" } }, () => Operate);
      break;
    default:
      icon = h(ElIcon, { style: { marginRight: "8px" } }, () => Link);
      break;
  }
  return icon;
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
    const getAllChildrenKeys = (treeNode: NetTree): number[] => {
      const keys: number[] = [];
      function getChildrenKeys(node: NetTree) {
        if (!node.children || !node.children.length) return;
        node.children.forEach(tree => {
          keys.push(tree.privId);
          if (tree.children) getChildrenKeys(tree);
        });
      }
      getChildrenKeys(treeNode);
      return keys;
    };
    /**
     * 获取当前节点的所有父节点
     */
    const getAllParentKeys = (treeNode: NetTree): number[] => {
      const keys: number[] = [];
      function getParentKeys(node: NetTree) {
        if (node.parentPrivId === undefined || node.parentPrivId === null)
          return;
        keys.push(node.parentPrivId);
        const parentNode = treeRef!.getNode(node.parentPrivId);
        if (parentNode) {
          getParentKeys(parentNode.data as NetTree);
        }
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
    const check = (
      node: NetTree,
      { checkedKeys }: { checkedKeys: number[] }
    ) => {
      // 当前节点选中状态
      const isChecked = checkedKeys.includes(node.privId);
      const childrenNodeKeys = getAllChildrenKeys(node);
      const parentNodeKeys = getAllParentKeys(node);
      setCheckedByKeys(childrenNodeKeys, isChecked);
      if (isChecked) {
        setCheckedByKeys(parentNodeKeys, true);
      }
      emitEvent();
    };
    const renderContent = (h: Function, { data }: { data: NetTree }) => {
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
                alignItems: "center",
                fontSize: "12px"
              }
            },
            [renderIcon(data.privType), data.privName]
          ),
          data.privCode
            ? h(
                "span",
                {
                  style: {
                    display: "flex",
                    width: "50%",
                    alignItems: "center",
                    fontSize: "12px"
                  }
                },
                [renderIcon(), data.privCode || ""]
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
          borderBottom: "1px #eee solid",
          fontSize: "14px",
          color: "#333"
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
      nodeKey: "privId",
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
