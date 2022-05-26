import App from "./App.vue";
import router from "./router";
import { setupStore } from "/@/store";
import { getServerConfig, getUserLoginInfo, setupUserInfo } from "./config";
import { createApp, Directive } from "vue";
import { useI18n } from "../src/plugins/i18n";
import { MotionPlugin } from "@vueuse/motion";
import { useElementPlus } from "../src/plugins/element-plus";
import useEmComponent from "/@/plugins/em-component";
import { injectResponsiveStorage } from "/@/utils/storage/responsive";

import "animate.css";
import "virtual:windi.css";
// 导入公共样式
import "./style/index.scss";
import "@pureadmin/components/dist/index.css";
import "@pureadmin/components/dist/theme.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

// 自定义指令
import * as directives from "/@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

const serverConfigPromise = getServerConfig(app);
const userInfoPromise = getUserLoginInfo();
Promise.all([serverConfigPromise, userInfoPromise]).then(async results => {
  const config = results[0];
  const userInfo = results[1];
  setupStore(app);
  setupUserInfo(userInfo);
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  app.use(MotionPlugin).use(useI18n).use(useElementPlus).use(useEmComponent);
  app.mount("#app");
});
