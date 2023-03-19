import { notification } from "antd";
import { StoreSlice } from "common/types";
import { IStateStores } from "stores";
import { DEFAULT_DATA_STORE } from "./constant";
import { ILoginSlice } from "./type";
import {
  LOCAL_STORAGE_FIRST_NAME,
  LOCAL_STORAGE_LAST_NAME,
  LOCAL_STORAGE_ORG_TOKEN,
  LOCAL_STORAGE_TOKEN,
} from "common/constants";
import { HOME_URL } from "pages/Home";

const createLoginSlice: StoreSlice<ILoginSlice, IStateStores> = (set, get) => ({
  login: {
    data: { ...DEFAULT_DATA_STORE },
    fetchUserProfile: () => {
      const { getUerProfile } = get();

      set((state) => {
        state.login.data.loading = true;
      });

      return new Promise((resolve, reject) => {
        getUerProfile()
          .then((response) => {
            const { data } = response;
            localStorage.setItem(
              LOCAL_STORAGE_ORG_TOKEN,
              data.memberships?.[0]?.token || ""
            );
            localStorage.setItem(
              LOCAL_STORAGE_FIRST_NAME,
              data.firstName || ""
            );
            localStorage.setItem(LOCAL_STORAGE_LAST_NAME, data.lastName || "");
            set((state) => {
              state.login.data.loading = false;
              state.login.data.userProfile = response.data;
            });
            resolve(data);
          })
          .catch((error) => {
            reject(error);
            set((state) => {
              state.login.data.loading = false;
            });
          });
      });
    },
    signIn: ({ email, password }) => {
      const {
        navigate,
        getToken,
        login: { fetchUserProfile },
      } = get();

      set((state) => {
        state.login.data.loading = true;
      });

      getToken({ email, password })
        .then((response) => {
          localStorage.setItem(
            LOCAL_STORAGE_TOKEN,
            response.access_token || ""
          );

          fetchUserProfile()
            .then(() => {
              notification.open({
                message: "Sign in successful!",
                type: "success",
              });
              navigate(HOME_URL);
            })
            .catch((error) => {
              notification.open({
                message: "Sign in failed!",
                type: "error",
              });
            });
        })
        .catch((error) => {
          set((state) => {
            state.login.data.loading = false;
          });
        });
    },

    clear: () => {
      set((state) => {
        state.login.data = { ...DEFAULT_DATA_STORE };
      });
    },
  },
});

export default createLoginSlice;
export type { ILoginSlice };
