import { atom } from "jotai";
import { MailItemType } from "../mail";

export const interactiveModeAtom = atom(true);
export const activeItemAtom = atom<string | null>(null);
export const hoveredItemAtom = atom<string | null>(null);
export const dragMailTypeAtom = atom<MailItemType | null>(null);
export const dropTargetAtom = atom<DOMRect | null>(null);
