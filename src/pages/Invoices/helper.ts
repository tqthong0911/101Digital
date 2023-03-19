import { FOMART_TIME_FE } from "common/constants";
import moment from "moment";
import { IData } from "./type";

export const mapDataToView = (data: IData["data"]) => {
  return data.map(({ createdAt, dueDate, invoiceDate, ...rest }) => ({
    ...rest,
    createdAt: moment(createdAt).format(FOMART_TIME_FE),
    invoiceDate: moment(invoiceDate).format(FOMART_TIME_FE),
    dueDate: moment(dueDate).format(FOMART_TIME_FE),
  }));
};
