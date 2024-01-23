import { useSetAtom } from "jotai";
import MailBox from "./components/home/mailbox";
import Panel from "./components/home/panel";
import Toolbar from "./components/home/toolbar";

import { DndContext } from "@dnd-kit/core";
import { mailAtom } from "./store/mail";
import { acceptance } from "./store/mail/accept-map";
import defaultProps from "./store/mail/default-props";
import ExportBtn from "./components/home/export-btn";

function App() {
  const setMailAtom = useSetAtom(mailAtom);

  return (
    <main className="grid grid-cols-[4rem_1fr_24rem] grid-rows-[4rem_1fr] w-screen h-screen">
      <header className="border-b col-span-3 flex items-center justify-between px-4">
        <h1 className="font-semibold">Z-Mail</h1>
        <ExportBtn />
      </header>

      <DndContext
        onDragEnd={(e) => {
          const itemType = e.active.id as any;
          const parentId = e.over?.id.toString();
          console.log({ itemType, parentId });
          if (!itemType || !parentId) {
            return;
          }
          const newItemId = crypto.randomUUID();
          setMailAtom((mail) => {
            const parentNode = mail.items[parentId];
            if (!acceptance[parentNode.type].includes(itemType)) {
              return mail;
            }

            let updatedParentNode = {
              ...parentNode,
            };

            if ("children" in parentNode && "children" in updatedParentNode) {
              updatedParentNode = {
                ...updatedParentNode,
                children: Array.isArray(parentNode.children)
                  ? [...parentNode.children, newItemId]
                  : (parentNode.children as any),
              };
              
            }

            return {
              ...mail,
              items: {
                ...mail.items,
                [newItemId]: {
                  id: newItemId,
                  parentId,
                  type: itemType,
                  ...defaultProps[itemType as keyof typeof defaultProps],
                } as any,
                [parentId]: updatedParentNode,
              },
            };
          });
        }}
      >
        <Toolbar />
        <MailBox />
      </DndContext>

      <Panel />
    </main>
  );
}

export default App;
