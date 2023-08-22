import { MailTreeNode } from "@/store/mail";

import { toolsMap } from "./toolbar";

export default function Mail({ node }: { node: MailTreeNode }) {
  const Component = toolsMap[node.type].component;

  const props =
    "props" in node && typeof node.props === "object" ? node.props : {};

  return (
    <Component
      {...props}
      id={node.id}
      children={node.children?.map((child) => (
        <Mail key={child.id} node={child} />
      ))}
    />
  );
}
