import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const demoRouter = {
  path: "/demo",
  name: "demo",
  component: Layout,
  redirect: "/demo/table",
  meta: {
    icon: "information-line",
    title: $t("demo.home"),
    i18n: true,
    rank: 9,
    access: ["c-system-mgr-root"]
  },
  children: [
    {
      meta: {
        title: $t("demo.tablepage"),
        i18n: true,
        access: ["c-proprietary-business"]
      },
      path: "/demo/table/index",
      name: "demo-table",
      component: () => import("/@/views/demo/table/index.vue")
    },
    {
      meta: {
        title: $t("demo.todo"),
        i18n: true,
        access: ["c-work-flow"]
      },
      path: "/demo/todo",
      name: "demo-todo",
      component: () => import("/@/views/demo/todo/index.vue")
    }
  ]
};

export default demoRouter;
