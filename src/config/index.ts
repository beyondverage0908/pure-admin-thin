import { App } from "vue";
import axios from "axios";
import { loadEnv } from "@build/index";
import { getUserInfo } from "/@/api/user";
import { isEmpty } from "/@/utils/is";
import { storageSession } from "/@/utils/storage";
import { useUserStoreHook } from "/@/store/modules/user";

interface PrivConfig {
  parentPrivId: number;
  privCode: string;
  privId: number;
  privName: string;
  privType: "C" | "A" | "M";
}

export type userInfoType = {
  userId?: string | number;
  userName?: string;
  realName?: string;
  menuPrivs?: PrivConfig[];
  operatePrivs?: PrivConfig[];
};

let config: object = {};
const Env = loadEnv();

const setConfig = (cfg?: unknown) => {
  config = Object.assign(config, Env, cfg);
};

const getConfig = (key?: string): ServerConfigs & ViteEnv => {
  if (typeof key === "string") {
    const arr = key.split(".");
    if (arr && arr.length) {
      let data = config;
      arr.forEach(v => {
        if (data && typeof data[v] !== "undefined") {
          data = data[v];
        } else {
          data = null;
        }
      });
      return data;
    }
  }
  return config;
};

// 获取项目动态全局配置
export const getServerConfig = async (app: App): Promise<undefined> => {
  app.config.globalProperties.$config = getConfig();
  return axios({
    baseURL: "",
    method: "get",
    url: `${Env.VITE_PUBLIC_PATH}serverConfig.json`
  })
    .then(({ data: config }) => {
      let $config = app.config.globalProperties.$config;
      // 自动注入项目配置
      if (app && $config && typeof config === "object") {
        $config = Object.assign($config, config);
        app.config.globalProperties.$config = $config;
        // 设置全局配置
        setConfig($config);
      }
      // 设置全局baseURL
      app.config.globalProperties.$baseUrl = $config.baseURL;
      return $config;
    })
    .catch(() => {
      throw "请在public文件夹下添加serverConfig.json配置文件";
    });
};

// 获取登录用户的信息
export const getUserLoginInfo = async () => {
  return getUserInfo().then(data => {
    if (!data.success) {
      storageSession.removeItem("info");
      return {};
    }
    const userInfo = data.data as userInfoType;
    if (isEmpty(userInfo as object)) {
      storageSession.removeItem("info");
      return {};
    }
    return userInfo;
  });
};
// 设置userInfo到store中
export const setupUserInfo = (userInfo?: userInfoType) => {
  const userStore = useUserStoreHook();
  userStore.SET_NAME(userInfo?.userName);
  userStore.SET_USERINFO(userInfo);
  storageSession.setItem("info", { username: userInfo.userName });
};

export { getConfig, setConfig };
