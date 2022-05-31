import { App, Component } from "vue";
import * as ElementPlusVueIcons from "@element-plus/icons-vue";
import {
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElCard,
  // 指令
  ElLoading,
  ElInfiniteScroll,
  // 组件
  ElTable,
  ElTableColumn,
  ElTree,
  ElContainer,
  ElMain,
  ElAside,
  ElForm,
  ElFormItem,
  ElPagination,
  ElCheckboxGroup,
  ElCheckbox,
  ElCheckboxButton
} from "element-plus";

// Directives
const plugins = [ElLoading, ElInfiniteScroll];

const components = [
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElCard,
  ElTable,
  ElTableColumn,
  ElTree,
  ElContainer,
  ElMain,
  ElAside,
  ElForm,
  ElFormItem,
  ElPagination,
  ElCheckboxGroup,
  ElCheckbox,
  ElCheckboxButton
];

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name, component);
  });
  // 注册element-plus的icon
  Object.keys(ElementPlusVueIcons).forEach(name => {
    app.component(name, ElementPlusVueIcons[name]);
  });
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin);
  });
}
