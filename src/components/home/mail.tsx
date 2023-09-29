import { useSetAtom } from "jotai";

import { useDndContext, useDroppable } from "@dnd-kit/core";

import { MailItemType, MailTreeNode } from "@/store/mail";
import { acceptance, canXAcceptY } from "@/store/mail/accept-map";
import { activeItemAtom } from "@/store/ui";

import { toolsMap } from "./toolbar";

export default function Mail({ node }: { node: MailTreeNode }) {
  const { active } = useDndContext();

  const { setNodeRef } = useDroppable({
    id: node.id,
    data: {
      type: node.type,
      accepts: acceptance[node.type],
    },
    disabled: !canXAcceptY(node.type, active?.id as MailItemType),
  });

  const setActiveItem = useSetAtom(activeItemAtom);

  const Component = toolsMap[node.type].component;

  const props =
    "props" in node && typeof node.props === "object" ? node.props : {};

  return (
    <Component
      {...props}
      id={node.id}
      data-item-type={node.type}
      children={
        Array.isArray(node.children)
          ? node.children?.map((child) => <Mail key={child.id} node={child} />)
          : node.children
      }
      onClick={(e) => {
        e.stopPropagation();
        setActiveItem(node.id);
      }}
      ref={setNodeRef}
    />
  );
}
