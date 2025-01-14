import { useEffect, useState } from "react";
import { sharedStore$, Store } from "@dp-wk/store";

export const useSharedStore = (): Store => {
  const [state, setState] = useState<Store>(sharedStore$.getValue());

  useEffect(() => {
    const subscription = sharedStore$.subscribe((newState) => {
      console.log("Received new state:", newState);
      setState(newState);
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
};
