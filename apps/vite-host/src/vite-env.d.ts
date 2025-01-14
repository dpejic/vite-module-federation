/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "catalog-element": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
  interface IntrinsicElements {
    "shopping-modal": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}

declare module "@catalog/catalog" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
  export = content;
}
declare module "@shopping/shopping-modal" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
  export = content;
}

declare global {
  interface Window {
    __sharedEventEmitter__: EventEmitterType | undefined;
    __sharedStore__: SharedStoreType;
  }
}
