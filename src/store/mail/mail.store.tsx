import { proxyWithHistory } from "valtio/utils";

import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { MailItemType, RootItem } from "./types";

export function init(): RootItem {
  return {
    id: "root-1",
    type: "root",
    parentId: null,
    props: {
      width: 600,
    },
    children: ["item-1", "item-4.5"],
    items: {
      "item-1": {
        type: MailItemType.Section,
        id: "item-1",
        parentId: "root-1",
        children: ["item-2"],
      },
      "item-4.5": {
        type: MailItemType.Section,
        id: "item-4.5",
        parentId: "root-1",
        children: ["item-5"],
      },
      "item-2": {
        type: MailItemType.Column,
        id: "item-2",
        parentId: "item-1",
        children: ["item-3"],
      },
      "item-3": {
        type: MailItemType.Container,
        id: "item-3",
        parentId: "item-2",
        children: ["item-4"],
      },
      "item-5": {
        type: MailItemType.Column,
        id: "item-5",
        parentId: "item-4.5",
        children: ["item-6"],
      },
      "item-6": {
        type: MailItemType.Container,
        id: "item-6",
        parentId: "item-5",
        children: ["item-7"],
      },
      "item-4": {
        type: MailItemType.Image,
        id: "item-4",
        parentId: "item-3",
        src: "https://images.unsplash.com/photo-1691689761334-3354040b72be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
        width: 600,
        height: 300,
      },
      "item-7": {
        type: MailItemType.Image,
        id: "item-7",
        parentId: "item-6",
        src: "https://images.unsplash.com/photo-1691689761334-3354040b72be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
        width: 600,
        height: 300,
      },
    },
  };
}

type TProxyWithHistory<T> = ReturnType<typeof proxyWithHistory<T>>;

type MailContextContent = {
  $mail: TProxyWithHistory<RootItem>;
};

const initialValue = init();

export const MailContext = createContext<MailContextContent>({
  $mail: proxyWithHistory(initialValue),
});

export function useMailContext() {
  return useContext(MailContext);
}

export default function MailProvider({ children }: PropsWithChildren) {
  const $mail = useRef(proxyWithHistory(initialValue));

  return (
    <MailContext.Provider value={{ $mail: $mail.current }}>
      {children}
    </MailContext.Provider>
  );
}
