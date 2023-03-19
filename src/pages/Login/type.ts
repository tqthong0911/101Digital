import { IResponseUserProfile } from "common/store/type";

export interface IData {
  loading: boolean;
  userName: string;
  password: string;
  userProfile?: IResponseUserProfile["data"];
}

export interface ILoginSlice {
  login: {
    clear: () => void;
    signIn: ({ email, password }: { email: string; password: string }) => void;
    fetchUserProfile: () => Promise<any>;
    data: IData;
  };
}
