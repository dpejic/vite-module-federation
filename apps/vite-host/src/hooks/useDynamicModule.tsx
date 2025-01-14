import { useState, useEffect } from "react";

export function useDynamicModule(modulePath: string) {
  const [state, setState] = useState<{
    isModuleAvailable: boolean;
    error: Error | null;
  }>({
    isModuleAvailable: true,
    error: null,
  });

  useEffect(() => {
    const loadModule = async () => {
      try {
        await import(modulePath);
        setState({ isModuleAvailable: true, error: null });
      } catch (error) {
        console.error(`Failed to load module: ${modulePath}`, error);
        setState({ isModuleAvailable: false, error: error as Error });
      }
    };

    loadModule();
  }, [modulePath]);

  return state;
}
