import { getConfig } from "/@/config";

const createCaptcha = () => {
  const config = getConfig();
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = config.PROD
    ? "https://cfgpassport.eastmoney.com/captcha/scripts/em_capt.js"
    : "https://cfgpassportuat2.eastmoney.com/captcha/scripts/em_capt.js";
  document.querySelector("body").appendChild(script);
};

export const useEMCaptcha = () => {
  createCaptcha();
};
