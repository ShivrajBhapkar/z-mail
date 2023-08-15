import { proxy } from "valtio";

const userPrefs = proxy({
  interactiveMode: true,
  hoveredItem: null as string | null,
});

export default userPrefs;
