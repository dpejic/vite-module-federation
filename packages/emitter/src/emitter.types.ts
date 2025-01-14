import { type EventEmitter, EventSubscription } from "fbemitter";

export type EventEmitterType = EventEmitter;

export enum EventsEmitter {
  TOGGLE_SHOPPING_MODAL = "TOGGLE_SHOPPING_MODAL",
}

export type EventsType = {
  [EventsEmitter.TOGGLE_SHOPPING_MODAL]: [payload: boolean];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EmitFunction<TEvents extends Record<string, any>> = <
  TEventName extends keyof TEvents & string
>(
  eventName: TEventName,
  ...eventArg: TEvents[TEventName]
) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AddListenerFunction<TEvents extends Record<string, any>> = <
  TEventName extends keyof TEvents & string
>(
  eventName: TEventName,
  handler: (...eventArg: TEvents[TEventName]) => void
) => EventSubscription;
