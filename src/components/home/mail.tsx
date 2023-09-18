import { MailTreeNode } from "@/store/mail";

import { activeItemAtom } from "@/store/ui";
import { useSetAtom } from "jotai";
import { toolsMap } from "./toolbar";

export default function Mail({ node }: { node: MailTreeNode }) {
  const setActiveItem = useSetAtom(activeItemAtom);

  const Component = toolsMap[node.type].component;

  const props =
    "props" in node && typeof node.props === "object" ? node.props : {};

  return (
    <Component
      {...props}
      id={node.id}
      data-item-type={node.type}
      children={node.children?.map((child) => (
        <Mail key={child.id} node={child} />
      ))}
      onClick={(e) => {
        e.stopPropagation();
        setActiveItem(node.id);
      }}
    />
  );
}
