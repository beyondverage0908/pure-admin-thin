import {
  h,
  defineComponent,
  withDirectives,
  resolveDirective,
  onMounted
} from "vue";
import * as captchApi from "/@/api/captch";

let compnentInstance = null;
let contextId = "";
let capt: EMCaptcha = null;
const CONTAINER_ID = "em-captch-container-id";
const APP_ID = "201901231134";
const CONTEXT_ID_HIDE = "accountIdHide";
const REFRESH_PWD = String(Date.now());

function refreshCaptcha() {
  if (!contextId) return;
  capt = new EMCaptcha({
    containerId: CONTAINER_ID,
    appid: APP_ID,
    captchaContextId: contextId,
    product: "float"
  })
    .onSuccess(() => {
      compnentInstance.$emit("success", contextId);
    })
    .onError(() => {
      compnentInstance.$emit("error");
    });
  // 账户input控件
  const input = document.getElementById(CONTEXT_ID_HIDE) as any;
  const account = input.value as string;
  capt.refresh(account, REFRESH_PWD);
}

async function getContext() {
  const data = await captchApi.getCaptchContext({
    AppId: APP_ID,
    Scope: "ICM"
  });
  if (data && data.success) {
    contextId = data.data;
    refreshCaptcha();
  }
}

const captchComponent = defineComponent({
  name: "captcha",
  inheritAttrs: false,
  emits: {
    success: (contextId: string) => {
      if (!contextId) return false;
      return true;
    },
    error: () => true
  },
  render() {
    const CONTEXT_ID = "contextId";
    const contextIdInput = h("input", {
      id: CONTEXT_ID,
      type: "hidden"
    });
    const accountIdHideInput = h("input", {
      id: CONTEXT_ID_HIDE,
      type: "hidden",
      value: "addmin"
    });
    const container = h("div", {
      id: CONTAINER_ID,
      style: {
        border: "1px solid #d7dde4",
        width: "100%",
        height: "46px",
        marginBottom: "10px"
      },
      initial: {
        pacity: 0,
        y: 40
      },
      enter: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 400
        }
      }
    });
    const VMotion = resolveDirective("motion");
    const directiveContainer = VMotion
      ? withDirectives(container, [[VMotion]])
      : container;
    return [contextIdInput, accountIdHideInput, directiveContainer];
  },
  setup() {
    onMounted(function () {
      getContext();
    });
  },
  mounted() {
    compnentInstance = this;
  }
});

export default captchComponent;
