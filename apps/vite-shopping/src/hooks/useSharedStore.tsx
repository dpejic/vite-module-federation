import { useEffect, useState } from "react";
import { sharedStore$, Store } from "@dp-wk/store";

export const useSharedStore = (): Store => {
  const [state, setState] = useState<Store>(sharedStore$.getValue());

  useEffect(() => {
    const subscription = sharedStore$.subscribe(setState);
    return () => subscription.unsubscribe();
  }, []);

  return state;
};
