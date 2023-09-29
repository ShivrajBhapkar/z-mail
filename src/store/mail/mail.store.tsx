import { PropsWithChildren } from "react";
import { Provider, atom } from "jotai";

import { INITIAL } from "./mock";

import type { AnyEmailItem, TMailBox } from ".";

export type MailTreeNode = Omit<AnyEmailItem, "children"> & {
  children?: MailTreeNode[] | string;
};

export const mailAtom = atom<TMailBox>(INITIAL);
export const prettyMailAtom = atom((get) => {
  const { rootId, items } = get(mailAtom);
  return walk(rootId, items);
});

export default function MailProvider({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}

export function walk(
  nodeId: string,
  record: Record<string, AnyEmailItem>
): MailTreeNode | null {
  if (!record[nodeId]) {
    return null;
  }

  const node = record[nodeId];
  return {
    ...node,
    children:
      "children" in node
        ? typeof node.children === "string"
          ? node.children
          : (node.children
              ?.map((c) => walk(c, record))
              .filter(Boolean) as MailTreeNode[])
        : undefined,
  };
}
