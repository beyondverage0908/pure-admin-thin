// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

function $t(key: string) {
  return key;
}

const permissionRouter = {
  path: "/permission",
  redirect: "/permission/page/index",
  meta: {
    title: $t("menus.permission"),
    icon: "lollipop",
    i18n: true,
    rank: 7
  },
  children: [
    {
      path: "/permission/page/index",
      name: "permissionPage",
      meta: {
        title: $t("menus.permissionPage"),
        i18n: true
      }
    },
    {
      path: "/permission/button/index",
      name: "permissionButton",
      meta: {
        title: $t("menus.permissionButton"),
        i18n: true,
        authority: []
      }
    }
  ]
};

// 添加不同按钮权限到/permission/button页面中
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority];
  return routes;
}

export default [
  {
    url: "/p2hmgr/api/getAsyncRoutes",
    method: "get",
    response: ({ query }) => {
      if (query.name === "admin") {
        return {
          code: 0,
          info: [setDifAuthority("v-admin", permissionRouter)]
        };
      } else {
        return {
          code: 0,
          info: [setDifAuthority("v-test", permissionRouter)]
        };
      }
    }
  }
] as MockMethod[];
