import queryString from "query-string";

import axios from "common/axiosClient";
import { StoreSlice } from "common/types";
import { IStateStores } from "stores";
import {
  CREATE_INVOICE_API,
  GET_INVOICES_API,
  GET_TOKEN_API,
  GET_UER_PROFILE_API,
} from "./apiURL";
import { ICommonSlice } from "./type";
import { MOCK_INVOICE } from "./mock";

const createCommonSlice: StoreSlice<ICommonSlice, IStateStores> = (
  set,
  get
) => ({
  navigate: () => {},

  setNavigate: (navigate) => {
    set((state) => {
      state.navigate = navigate;
    });
  },
  clearAllStore: () => {
    const state = get();

    Object.keys(state).forEach((key) => {
      const item = state[key];
      item?.clear && item?.clear();
    });
  },

  getToken: ({ email: username, password }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          GET_TOKEN_API,
          {
            client_id: "oO8BMTesSg9Vl3_jAyKpbOd2fIEa",
            client_secret: "0Exp4dwqmpON_ezyhfm0o_Xkowka",
            grant_type: "password",
            scope: "openid",
            username,
            password,
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getUerProfile: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(GET_UER_PROFILE_API, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getInvoices: (query) => {
    return new Promise((resolve, reject) => {
      const url = queryString.stringifyUrl({
        url: GET_INVOICES_API,
        query: {
          ...query,
          dateType: "INVOICE_DATE",
        },
      });
      axios
        .get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  createInvoice: (invoice) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CREATE_INVOICE_API, {
          invoices: [{ ...invoice, ...MOCK_INVOICE, ...invoice }],
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  },
});

export default createCommonSlice;
export type { ICommonSlice };
