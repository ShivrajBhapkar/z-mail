import { atom } from "jotai";

export const interactiveModeAtom = atom(true);
export const activeItemAtom = atom<string | null>(null);
export const hoveredItemAtom = atom<string | null>(null);
