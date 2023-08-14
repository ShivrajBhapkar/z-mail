import { proxy } from "valtio";

const userPrefs = proxy({
  interactiveMode: true,
});

export default userPrefs;
