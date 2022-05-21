// @ts-ignore
type EMCaptchaContext = {
  validate: string;
  contextId: string;
};

declare class EMCaptcha {
  constructor(params: object);
  onSuccess(func: Function): EMCaptcha;
  onError(func: Function): EMCaptcha;
  public refresh(account: string, pwd: string): void;
  public getValidate(): EMCaptchaContext;
}
