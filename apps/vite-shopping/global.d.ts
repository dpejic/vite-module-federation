import type { EventEmitterType } from "@dp-wk/emitter";
import type { SharedStoreType } from "@dp-wk/store";
/// <reference types="vite/client" />

declare module "*.module.css";

declare global {
  interface Window {
    __sharedEventEmitter__: EventEmitterType | undefined;
    __sharedStore__: SharedStoreType;
  }
}

export {};
