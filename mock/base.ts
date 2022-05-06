export const messageBaseInfo = {
  message: "请求成功",
  code: 200,
  data: {},
  success: true
};

export enum Method {
  get = "get",
  post = "post",
  put = "put",
  head = "head",
  delete = "delete"
}

interface Context {
  url: string;
  query?: any;
  body?: any;
  headers?: any;
}

export type MockType = {
  url: string | RegExp;
  method: Method;
  response: (context: Context) => object;
};
