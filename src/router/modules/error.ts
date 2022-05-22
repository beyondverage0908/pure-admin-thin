import { $t } from "/@/plugins/i18n";

const errorRouter = [
  {
    path: "/error/403",
    name: "403",
    component: () => import("/@/views/error/403.vue"),
    meta: {
      title: $t("menus.hsfourZeroOne"),
      i18n: true,
      showLink: false
    }
  },
  {
    path: "/error/404",
    name: "404",
    component: () => import("/@/views/error/404.vue"),
    meta: {
      title: $t("menus.hsfourZeroFour"),
      i18n: true,
      showLink: false
    }
  },
  {
    path: "/error/500",
    name: "500",
    component: () => import("/@/views/error/500.vue"),
    meta: {
      title: $t("menus.hsFive"),
      i18n: true,
      showLink: false
    }
  }
];

export default errorRouter;
