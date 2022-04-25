import { http } from "../utils/http";

interface captchaType extends Promise<any> {
  data?: string;
  success?: boolean;
  message?: string;
  code?: string;
}

// 刷新token
export const getCaptchContext = (data: object): captchaType => {
  return http.request("post", "/sys/gencontext", { data });
};
