import { MailTreeNode, prettyMailAtom } from "@/store/mail";
import { render } from "@react-email/render";
import { useAtomValue } from "jotai";
import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toolsMap } from "./toolbar";

export default function ExportBtn() {
  const mail = useAtomValue(prettyMailAtom);
  console.log(mail);

  return (
    <Button
      type="button"
      onClick={() => {
        if (!mail) {
          return;
        }
        const htmlMail = render(<MailRenderer node={mail} />);
        const blob = new Blob([htmlMail], { type: "text/html" });
        const a = document.createElement("a");
        a.download = "export.html";
        a.href = URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
      }}
    >
      <DownloadIcon size={20} className="mr-2" /> Export
    </Button>
  );
}

function MailRenderer({ node }: { node: MailTreeNode }) {
  const Component = toolsMap[node.type].component;
  const props =
    "props" in node && typeof node.props === "object" ? node.props : {};

  return (
    <Component
      {...props}
      children={
        Array.isArray(node.children)
          ? node.children?.map((child) => (
              <MailRenderer key={child.id} node={child} />
            ))
          : node.children
      }
    />
  );
}
