export interface NetTree {
  privId: number;
  parentPrivId: number;
  privType: PrivType;
  privCode: string;
  privName: string;
  children?: NetTree[];
}
/**
 * 菜单类型
 */
export enum PrivType {
  contents = "C",
  menu = "M",
  operation = "A"
}

// 系统根目录
const SYSTEM_ROOT = 0;

/**
 * 递归构建树结构数据源
 * @param originNetData
 * @returns
 */
export function recursiveConstructTreeData(originNetData: NetTree[]): NetTree {
  const systemRoot = originNetData.find(
    item => item.parentPrivId === SYSTEM_ROOT
  );
  if (!systemRoot) {
    return;
  }
  // 查找节点有多少子节点
  const loopFindNodes = (data: NetTree) => {
    const children = [];
    originNetData.forEach(item => {
      if (item.parentPrivId === data.privId) {
        children.push(item);
        loopFindNodes(item);
      }
    });
    data.children = children;
  };
  loopFindNodes(systemRoot);
  return systemRoot;
}
