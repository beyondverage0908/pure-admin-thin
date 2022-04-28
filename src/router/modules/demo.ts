import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

export default {
  path: "/demo",
  name: "demo",
  component: Layout,
  redirect: "/demo/table",
  meta: {
    icon: "information-line",
    title: $t("demo.home"),
    i18n: true,
    rank: 9
  },
  children: [
    {
      meta: {
        title: $t("demo.tablepage"),
        i18n: true
      },
      path: "/demo/table",
      name: "demo-table",
      component: () => import("/@/views/demo/table/index.vue")
    },
    {
      meta: {
        title: $t("demo.todo"),
        i18n: true
      },
      path: "/demo/todo",
      name: "demo-todo",
      component: () => import("/@/views/demo/todo/index.vue")
    },
    {
      path: "/demo/role",
      name: "demo-role",
      component: () => import("/@/views/demo/role/index.vue"),
      meta: {
        title: $t("demo.role"),
        i18n: true
      }
    }
  ]
};
