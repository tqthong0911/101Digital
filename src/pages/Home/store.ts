import { LOCAL_STORAGE_ORG_TOKEN } from "common/constants";
import { StoreSlice } from "common/types";
import { LOGIN_URL } from "pages/Login/constant";
import { IStateStores } from "stores";
import { DEFAULT_DATA_STORE } from "./constants";
import { IHomeSlice } from "./type";

const createHomeSlice: StoreSlice<IHomeSlice, IStateStores> = (set, get) => ({
  home: {
    data: { ...DEFAULT_DATA_STORE },
    clear: () => {
      set((state) => {
        state.home.data = { ...DEFAULT_DATA_STORE };
      });
    },
    signOut: () => {
      const { navigate, clearAllStore } = get();
      localStorage.clear();
      clearAllStore();
      navigate(LOGIN_URL);
    },
    initData: () => {
      const { getUerProfile } = get();

      return new Promise((resolve, reject) => {
        getUerProfile()
          .then((response) => {
            const { data } = response;
            localStorage.setItem(
              LOCAL_STORAGE_ORG_TOKEN,
              data.memberships?.[0]?.token || ""
            );
            set((state) => {
              state.home.data.userProfile = response.data;
            });
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default createHomeSlice;
export type { IHomeSlice };
