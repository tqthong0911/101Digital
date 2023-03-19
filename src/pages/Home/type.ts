import { IResponseUserProfile } from "common/store/type";

export interface IData {
  userProfile?: IResponseUserProfile["data"];
}

export interface IHomeSlice {
  home: {
    data: IData;
    signOut: () => void;
    initData: () => Promise<any>;
  };
}
