<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { initRouter } from "/@/router/utils";
import { storageSession } from "/@/utils/storage";
import { addClass, removeClass } from "/@/utils/operate";
import * as captchApi from "/@/api/captch";
import bg from "/@/assets/login/bg.png";
import avatar from "/@/assets/login/avatar.svg?component";
import illustration from "/@/assets/login/illustration.svg?component";

const router = useRouter();

let user = ref("admin");
let pwd = ref("123456");
let contextId = "";
let capt: EMCaptcha = null;

const onLogin = (): void => {
  storageSession.setItem("info", {
    username: "admin",
    accessToken: "eyJhbGciOiJIUzUxMiJ9.test"
  });
  initRouter("admin").then(() => {});
  router.push("/");
};

function onUserFocus() {
  addClass(document.querySelector(".user"), "focus");
}

function onUserBlur() {
  if (user.value.length === 0)
    removeClass(document.querySelector(".user"), "focus");
}

function onPwdFocus() {
  addClass(document.querySelector(".pwd"), "focus");
}

function onPwdBlur() {
  if (pwd.value.length === 0)
    removeClass(document.querySelector(".pwd"), "focus");
}

function refreshCaptcha() {
  if (!contextId) return;
  capt = new EMCaptcha({
    containerId: "containerId",
    appid: "201901231134",
    captchaContextId: contextId,
    product: "float"
  })
    .onSuccess(() => {
      console.log("成功");
    })
    .onError(() => {
      console.log("失败");
    });
  const accountId = "accountIdHide"; // 账户input控件
  const input = document.getElementById(accountId) as any;
  const account = input.value as string;
  const pwd = "111111rrrrrrrrrrrrrrrr";
  capt.refresh(account, pwd);
}

onMounted(async () => {
  const data = await captchApi.getCaptchContext({
    AppId: "201901231134",
    Scope: "ICM"
  });
  if (data && data.success) {
    contextId = data.data;
    refreshCaptcha();
  }
});
</script>

<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <illustration />
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <h2
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 100
            }
          }"
        >
          Pure Admin
        </h2>
        <div
          class="input-group user focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 200
            }
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-user" width="14" height="14" />
          </div>
          <div>
            <h5>用户名</h5>
            <input
              type="text"
              class="input"
              v-model="user"
              @focus="onUserFocus"
              @blur="onUserBlur"
            />
          </div>
        </div>
        <div
          class="input-group pwd focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 300
            }
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-lock" width="14" height="14" />
          </div>
          <div>
            <h5>密码</h5>
            <input
              type="password"
              class="input"
              v-model="pwd"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
            />
          </div>
        </div>
        <!-- 验证码相关 -->
        <input id="contextId" type="hidden" />
        <input id="accountIdHide" type="hidden" value="admin" />
        <div
          id="containerId"
          v-motion
          :initial="{
            opacity: 0,
            y: 10
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 400
            }
          }"
          style="
            border: 1px solid #d7dde4;
            width: 100%;
            height: 46px;
            margin-bottom: 10px;
          "
        />
        <!-- end -->
        <button
          class="btn"
          v-motion
          :initial="{
            opacity: 0,
            y: 20
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 400
            }
          }"
          @click="onLogin"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>
