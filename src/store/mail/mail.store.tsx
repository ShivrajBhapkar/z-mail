import { proxyWithHistory } from "valtio/utils";

import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { MailItemType, RootItem } from "./types";

export function init(): RootItem {
  return {
    id: crypto.randomUUID(),
    type: "root",
    props: {
      width: 600,
    },
    children: [
      {
        type: MailItemType.Section,
        id: crypto.randomUUID(),
        children: [
          {
            type: MailItemType.Column,
            id: crypto.randomUUID(),
            children: [
              {
                type: MailItemType.Container,
                id: crypto.randomUUID(),
                children: [
                  {
                    type: MailItemType.Image,
                    id: crypto.randomUUID(),
                    src: "https://images.unsplash.com/photo-1691689761334-3354040b72be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
                    width: 600,
                    height: 300,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: MailItemType.Section,
        id: crypto.randomUUID(),
        children: [
          {
            type: MailItemType.Column,
            id: crypto.randomUUID(),
            children: [
              {
                type: MailItemType.Container,
                id: crypto.randomUUID(),
                children: [
                  {
                    type: MailItemType.Image,
                    id: crypto.randomUUID(),
                    src: "https://images.unsplash.com/photo-1691689761334-3354040b72be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
                    width: 600,
                    height: 300,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: MailItemType.Section,
        id: crypto.randomUUID(),
        children: [
          {
            type: MailItemType.Column,
            id: crypto.randomUUID(),
            children: [
              {
                type: MailItemType.Container,
                id: crypto.randomUUID(),
                children: [
                  {
                    type: MailItemType.Image,
                    id: crypto.randomUUID(),
                    src: "https://images.unsplash.com/photo-1691689761334-3354040b72be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
                    width: 300,
                    height: 300,
                  },
                ],
              },
            ],
          },
          {
            type: MailItemType.Column,
            id: crypto.randomUUID(),
            children: [
              {
                type: MailItemType.Container,
                id: crypto.randomUUID(),
                children: [
                  {
                    type: MailItemType.Image,
                    id: crypto.randomUUID(),
                    src: "https://images.unsplash.com/photo-1691689761334-3354040b72be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
                    width: 300,
                    height: 300,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
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
