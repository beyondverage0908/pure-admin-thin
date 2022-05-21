<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { initRouter } from "/@/router/utils";
import { addClass, removeClass } from "/@/utils/operate";
import bg from "/@/assets/login/bg.png";
import avatar from "/@/assets/login/avatar.svg?component";
import illustration from "/@/assets/login/illustration.svg?component";
import EMCaptcha from "../components/EMCaptcha";
import { useUserStoreHook } from "/@/store/modules/user";
import { ElMessage } from "element-plus";

const router = useRouter();

let user = ref("admin");
let pwd = ref("123456");
let validateContext: EMCaptchaContext = null;

const onLogin = async (): Promise<void> => {
  if (!user.value || !pwd.value) {
    ElMessage({ message: "账号或密码不能为空", type: "info" });
    return;
  }
  if (!validateContext) {
    ElMessage({
      type: "info",
      message: "请先进行验证码验证后再提交"
    });
    return;
  }
  const isLogin = await useUserStoreHook().loginByUsername({
    username: user.value,
    password: pwd.value,
    captchaConsolidateReq: {
      ContextId: validateContext.contextId,
      ValidateResult: validateContext.validate,
      Account: user.value
    }
  });
  console.log("-----", isLogin);
  if (isLogin) {
    initRouter().then(() => {});
    router.replace("/");
  }
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

function handleCheckSuccess(ctx: EMCaptchaContext) {
  console.log("--->>>", ctx);
  validateContext = ctx;
}
function handleCheckError() {
  validateContext = null;
}
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
        <EMCaptcha @success="handleCheckSuccess" @error="handleCheckError" />
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
