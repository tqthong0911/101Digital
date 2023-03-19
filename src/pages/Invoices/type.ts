import {
  IInvoiceInfo,
  IInvoicesQuery,
  IResponseInvoices,
} from "common/store/type";

export interface IData extends IInvoicesQuery {
  loading: boolean;
  data: IResponseInvoices["data"];
  total: number;
  isOpen: boolean;
  modaLoading: boolean;
}

export interface IInvoicesSlice {
  invoices: {
    data: IData;
    initData: () => void;
    fetchInvoices: (query: IInvoicesQuery) => void;
    createInvoice: (invoice: IInvoiceInfo) => void;
    handleOpenModalAdd: () => void;
    handleCloseModalAdd: () => void;
    clear: () => void;
  };
}
