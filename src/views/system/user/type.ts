// 禁用状态
export enum SysFlag {
  enable = "1",
  disabled = "0"
}
// 是否用户预置
export enum Preset {
  yes = 1,
  no = 0
}
// 用户信息
export type UserRow = {
  userId?: number;
  userName?: string;
  realName?: string;
  phone?: string;
  email?: string;
  state?: Preset;
  sysFlag?: SysFlag;
  userPwd?: string;
};
