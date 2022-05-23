import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const systemRouter = {
  path: "/system",
  name: "system",
  component: Layout,
  redirect: "/system/user",
  meta: {
    icon: "setting",
    title: $t("system.system"),
    i18n: true,
    rank: 9,
    access: []
  },
  children: [
    {
      meta: {
        title: $t("system.user"),
        i18n: true,
        access: []
      },
      path: "/system/user",
      name: "system-user",
      component: () => import("/@/views/system/user/index.vue")
    },
    {
      path: "/system/role",
      name: "system-role",
      component: () => import("/@/views/system/role/index.vue"),
      meta: {
        title: $t("system.role"),
        i18n: true,
        access: []
      }
    }
  ]
};

export default systemRouter;
