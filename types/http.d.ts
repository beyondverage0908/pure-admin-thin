// 接口请求的响应的统一定义
interface HttpResponseType extends Promise<any> {
  code?: number;
  message?: string;
  data?: any;
  success?: boolean;
}
