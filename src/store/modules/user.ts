import { defineStore } from "pinia";
import { store } from "/@/store";
import { userType, userInfoType } from "./types";
import { router } from "/@/router";
import { storageSession } from "/@/utils/storage";
import { getLogin, refreshToken, getUserInfo } from "/@/api/user";
import { getToken, setToken, removeToken } from "/@/utils/auth";
import { isEmpty } from "/@/utils/is";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";

const data = getToken();
let token = "";
let name = "";
if (data) {
  const dataJson = JSON.parse(data);
  if (dataJson) {
    token = dataJson?.accessToken;
    name = dataJson?.name ?? "admin";
  }
}

export const useUserStore = defineStore({
  id: "user",
  state: (): userType => ({
    token,
    name,
    userInfo: {}
  }),
  getters: {
    userId: state => state.userInfo.userId,
    menuPrivs: state => state.userInfo.menuPrivs || [],
    operatePrivs: state => state.userInfo.operatePrivs || [],
    isLogin: state => isEmpty(state.userInfo)
  },
  actions: {
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_NAME(name) {
      this.name = name;
    },
    SET_USERINFO(userInfo: userInfoType) {
      this.userInfo = userInfo;
    },
    // 获取登录用户的信息
    async getUserLoginInfo() {
      return getUserInfo().then(data => {
        if (!data.success) {
          return false;
        }
        const userInfo = data.data as userInfoType;
        if (isEmpty(userInfo as object)) {
          return false;
        }
        this.SET_NAME(userInfo.userName);
        this.SET_USERINFO(userInfo);
        storageSession.setItem("info", { username: userInfo.userName });
        return true;
      });
    },
    // 登入
    async loginByUsername(data) {
      return new Promise<void>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data) {
              setToken(data);
              resolve();
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出 清空缓存
    logOut() {
      this.token = "";
      this.name = "";
      removeToken();
      storageSession.clear();
      useMultiTagsStoreHook().handleTags("equal", [
        {
          path: "/welcome",
          parentPath: "/",
          meta: {
            title: "menus.hshome",
            icon: "home-filled",
            i18n: true
          }
        }
      ]);
      router.push("/login");
    },
    // 刷新token
    async refreshToken(data) {
      return refreshToken(data).then(data => {
        if (data) {
          setToken(data);
          return data;
        }
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
