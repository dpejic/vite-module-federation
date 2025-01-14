import { EventEmitter, EventSubscription } from "fbemitter";
import {
  AddListenerFunction,
  EmitFunction,
  type EventEmitterType,
  EventsType,
} from "./emitter.types";

const globalKey = "__sharedEventEmitter__";

const createEventEmitter = <T extends Record<string, any>>(
  emitter: EventEmitterType
): {
  emit: EmitFunction<T>;
  addListener: AddListenerFunction<T>;
} => {
  const sharedEmitter = window[globalKey] || emitter;

  if (!window[globalKey]) {
    window[globalKey] = sharedEmitter;
  }

  const emit: EmitFunction<T> = (eventName, ...eventArg) => {
    sharedEmitter.emit(eventName, ...(eventArg as []));
  };

  const addListener: AddListenerFunction<T> = (
    eventName,
    handler
  ): EventSubscription => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return sharedEmitter.addListener(eventName, handler as any);
  };

  return { emit, addListener };
};

export const emitter = createEventEmitter<EventsType>(new EventEmitter());
