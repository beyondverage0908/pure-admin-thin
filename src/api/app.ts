import { http } from "../utils/http";

interface MessageType extends Promise<any> {
  code?: number;
  message?: string;
  data?: any;
  success?: boolean;
}

// 获取权限
export const getPrivs = (): MessageType => {
  return http.request("get", "/privs");
};
