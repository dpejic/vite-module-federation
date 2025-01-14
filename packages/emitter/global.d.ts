import type { EventEmitterType } from "./src/emitter.types";

declare global {
  interface Window {
    __sharedEventEmitter__: EventEmitterType | undefined;
  }
}

export {};
