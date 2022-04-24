import { http } from "../utils/http";

// 刷新token
export const getCaptchContext = (data: object) => {
  return http.request("post", "/sys/gencontext", { data });
};
