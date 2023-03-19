import createHook, { GetState, SetState } from "zustand";
import { createStore, Mutate, StoreApi } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { MagicKeyValue } from "common/types";
import createCommonSlice, { ICommonSlice } from "common/store";
import createHomeSlice, { IHomeSlice } from "pages/Home/store";
import createLoginSlice, { ILoginSlice } from "pages/Login/store";
import createInvoicesSlice, { IInvoicesSlice } from "pages/Invoices/store";

export interface IStateStores
  extends MagicKeyValue,
    ICommonSlice,
    IHomeSlice,
    IInvoicesSlice,
    ILoginSlice {}

type IStore = Mutate<StoreApi<IStateStores>, [["zustand/immer", never]]>;
const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createCommonSlice(set, get),
  ...createHomeSlice(set, get),
  ...createLoginSlice(set, get),
  ...createInvoicesSlice(set, get),
});

const store: IStore = createStore<IStateStores>()(immer(createRootSlice));
const useStore = createHook(store);
export default useStore;
