import { h, defineComponent } from "vue";
import * as captchApi from "/@/api/captch";

let compnentInstance = null;
let contextId = "";
let capt: EMCaptcha = null;
const CONTAINER_ID = "containerId";
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
      console.log("成功：", contextId);
      compnentInstance.$emit("onSuccess", contextId);
    })
    .onError(() => {
      console.log("失败");
      compnentInstance.$emit("onError");
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
  emits: {
    onSuccess: (contextId: string) => {
      if (!contextId) return false;
      return true;
    },
    onError: () => true
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
      }
    });
    return h(
      "div",
      {
        style: {
          display: "inline"
        }
      },
      [contextIdInput, accountIdHideInput, container]
    );
  },
  setup() {
    getContext();
  },
  mounted() {
    compnentInstance = this;
  }
});

export default captchComponent;
