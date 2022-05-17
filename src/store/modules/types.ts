import { RouteRecordName } from "vue-router";
import { NetTree } from "/@/components/PrivTree/util";

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Hamburger
    isClickHamburger: boolean;
  };
  layout: string;
  device: string;
  privCodes?: NetTree[];
  roles?: any[];
};

export type multiType = {
  path: string;
  parentPath: string;
  name: string;
  meta: any;
  query?: object;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

interface PrivConfig {
  parentPrivId: number;
  privCode: string;
  privId: number;
  privName: string;
  privType: "C" | "A" | "M";
}

export type userInfoType = {
  userId?: string | number;
  userName?: string;
  realName?: string;
  menuPrivs?: PrivConfig[];
  operatePrivs?: PrivConfig[];
};

export type userType = {
  token: string;
  name?: string;
  userInfo?: userInfoType;
};
