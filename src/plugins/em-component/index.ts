/**
 * 装载全局的东财项目相关的组件库
 */

import { App } from "vue";
import EmTable from "/@/components/EMTable";
import EmColumnsFilter from "/@/components/EMColumnsFilter";

export default function useEmComponent(app: App) {
  app.component(EmTable.name, EmTable);
  app.component(EmColumnsFilter.name, EmColumnsFilter);
}
