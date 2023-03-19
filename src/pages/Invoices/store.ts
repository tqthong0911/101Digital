import { notification } from "antd";
import { StoreSlice } from "common/types";
import { LOGIN_URL } from "pages/Login/constant";
import { IStateStores } from "stores";
import { DEFAULT_DATA_STORE } from "./constants";
import { IInvoicesSlice } from "./type";

const createInvoicesSlice: StoreSlice<IInvoicesSlice, IStateStores> = (
  set,
  get
) => ({
  invoices: {
    data: { ...DEFAULT_DATA_STORE },
    clear: () => {
      set((state) => {
        state.invoices.data = { ...DEFAULT_DATA_STORE };
      });
    },
    fetchInvoices: ({ pageNum, pageSize, dateType, ordering, sortBy }) => {
      const {
        getInvoices,
        home: { signOut },
      } = get();

      set((state) => {
        state.invoices.data.loading = true;
      });

      getInvoices({
        pageNum,
        pageSize,
        dateType,
        ordering,
        sortBy,
      })
        .then(({ data, paging }) => {
          set((state) => {
            state.invoices.data.data = data;
            state.invoices.data.pageNum = paging.pageNumber;
            state.invoices.data.pageSize = paging.pageSize;
            state.invoices.data.total = paging.totalRecords;
          });
        })
        .catch((error) => {
          const isInvalidCredentials = error.status === 401;

          notification.open({
            message: isInvalidCredentials
              ? "Invalid credentials"
              : "Get data failed!",
            type: "error",
          });
          signOut();
        })
        .finally(() => {
          set((state) => {
            state.invoices.data.loading = false;
          });
        });
    },
    initData: () => {
      const {
        invoices: { fetchInvoices, data },
      } = get();

      const { pageNum, pageSize, dateType, ordering, sortBy } = data;
      fetchInvoices({ pageNum, pageSize, dateType, ordering, sortBy });
    },

    createInvoice: (invoice) => {
      const {
        createInvoice,
        invoices: { handleCloseModalAdd },
      } = get();

      set((state) => {
        state.invoices.data.modaLoading = true;
      });

      createInvoice(invoice)
        .then((response) => {
          notification.open({
            message: "Create Invoice Success!",
            type: "success",
          });

          set((state) => {
            state.invoices.data.data = [
              { ...invoice, ...(response as any).data }, // cheat because API wrong
              ...state.invoices.data.data,
            ];
            state.invoices.data.total =
              state.invoices.data.total + response.data.length;
          });
          handleCloseModalAdd();
        })
        .catch((error) => {
          notification.open({
            message: "Create invoice failed!",
            type: "error",
          });
        })
        .finally(() => {
          set((state) => {
            state.invoices.data.modaLoading = false;
          });
        });
    },

    handleCloseModalAdd: () => {
      set((state) => {
        state.invoices.data.isOpen = false;
      });
    },
    handleOpenModalAdd: () => {
      set((state) => {
        state.invoices.data.isOpen = true;
      });
    },
  },
});

export default createInvoicesSlice;
export type { IInvoicesSlice };
