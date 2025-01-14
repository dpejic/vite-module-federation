import type { SharedStoreType } from "./src";

declare global {
  interface Window {
    __sharedStore__: SharedStoreType;
  }
}

export {};
