import type { ColumnsType } from "antd/es/table";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "common/constants";
import { IData } from "./type";

export const DEFAULT_DATA_STORE: IData = {
  loading: false,
  data: [],
  pageNum: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 0,
  isOpen: false,
  modaLoading: false,
  ordering: undefined,
  sortBy: undefined,
  dateType: undefined,
};

export const COLUMNS: ColumnsType<any> = [
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    sorter: true,
    ellipsis: true,
    align: "right",
  },
  {
    title: "Invoice Date",
    dataIndex: "invoiceDate",
    sorter: true,
    ellipsis: true,
    align: "right",
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: true,
    ellipsis: true,
    align: "right",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    sorter: true,
    ellipsis: true,
    align: "right",
  },
];
