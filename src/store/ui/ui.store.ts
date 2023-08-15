import { proxy } from "valtio";

const uiStore = proxy({
  interactiveMode: true,
  hoveredItem: null as string | null,
  selectedItemId: null as string | null,
});

export default uiStore;
