import { GetState, SetState } from "zustand";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

export interface MagicKeyValue {
  [key: string]: any;
}

export interface IStoreSlice {
  clear?: () => void;
  fetchData?: () => void;
}
