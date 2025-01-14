import { Item } from "@dp-wk/types";
import { BehaviorSubject } from "rxjs";

const globalKey = "__sharedStore__";

if (!window[globalKey]) {
  // @ts-ignore
  window[globalKey] = {};
}

export type Store = {
  items: Item[];
};

const initialState: Store = {
  items: [],
};

export type SharedStoreType = {
  store$: BehaviorSubject<Store>;
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  addNewItem: (item: Item) => void;
};

if (!window[globalKey]?.store$) {
  window[globalKey].store$ = new BehaviorSubject<Store>(initialState);
}
const store$ = window[globalKey].store$;

const addItemToStore = (item: Item) => {
  const currentState = store$.getValue();
  store$.next({
    ...currentState,
    items: [...currentState.items, item],
  });
};

const addNewItemToStore = (item: Item) => {
  const currentState = store$.getValue();
  store$.next({
    ...currentState,
    items: [...currentState.items, item],
  });
};

const removeItemFromStore = (id: number) => {
  const currentState = store$.getValue();
  store$.next({
    ...currentState,
    items: currentState.items.filter((item) => item.id !== id),
  });
};
if (!window[globalKey].addItem) {
  window[globalKey].addItem = addItemToStore;
}
if (!window[globalKey].addNewItem) {
  window[globalKey].addNewItem = addNewItemToStore;
}
if (!window[globalKey].removeItem) {
  window[globalKey].removeItem = removeItemFromStore;
}

export const sharedStore$ = window[globalKey].store$ as BehaviorSubject<Store>;
export const addItem = window[globalKey].addItem;
export const addNewItem = window[globalKey].addNewItem;
export const removeItem = window[globalKey].removeItem;
