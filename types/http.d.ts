// 接口请求的响应的统一定义

interface Response {
  code: number;
  message: string;
  data?: any;
  success: boolean;
}
interface HttpResponseType extends Promise<Response> {}
