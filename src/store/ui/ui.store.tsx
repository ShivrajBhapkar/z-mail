import { observable } from "@legendapp/state";
import { PropsWithChildren, createContext, useContext, useRef } from "react";

export const UIContext = createContext(
  observable({
    interactiveMode: true,
    selectedItem: null as string | null,
    hoveredItem: null as string | null,
  })
);

export function useUI() {
  return useContext(UIContext);
}

export function UIProvider({ children }: PropsWithChildren) {
  const state = useRef(
    observable({
      interactiveMode: true,
      selectedItem: null as string | null,
      hoveredItem: null as string | null,
    })
  ).current;

  return <UIContext.Provider value={state}>{children}</UIContext.Provider>;
}
