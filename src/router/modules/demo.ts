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
    },
    {
      meta: {
        title: $t("demo.option-api"),
        i18n: true,
        access: []
      },
      path: "/demo/option/api",
      name: "demo-option-api",
      component: () => import("/@/views/demo/option-api/index.vue")
    },
    {
      meta: {
        title: $t("demo.composition-api"),
        i18n: true,
        access: []
      },
      path: "/demo/composition/api",
      name: "demo-composition-api",
      component: () => import("/@/views/demo/composition-api/index.vue")
    },
    {
      meta: {
        title: $t("demo.render-api"),
        i18n: true,
        access: []
      },
      path: "/demo/render/api",
      name: "demo-render-api",
      component: () => import("/@/views/demo/render-api/index.vue")
    },
    {
      meta: {
        title: $t("demo.jsx-api"),
        i18n: true,
        access: []
      },
      path: "/demo/jsx/api",
      name: "demo-jsx-api",
      component: () => import("../../views/demo/jsx-api/index.jsx")
    }
  ]
};

export default demoRouter;
