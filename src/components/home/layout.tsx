import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRightIcon, MailIcon } from "lucide-react";

import { useMailContext, type AnyEmailItem, type RootItem } from "@/store/mail";

import { cn } from "@/lib/utils";
import { toolsMap } from "./toolbar";

export default function Layout() {
  const { $mail } = useMailContext();
  return <LayoutItem item={$mail.value} />;
}

function LayoutItem({ item }: { item: RootItem | AnyEmailItem }) {
  const hasChildren = "children" in item;

  const { icon: Icon, label } =
    item.type === "root"
      ? { icon: MailIcon, label: "Mail" }
      : toolsMap[item.type];

  function onActive(event: React.MouseEvent) {
    event.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("layout-item-activate-change", {
        detail: { id: item.id },
      })
    );
  }

  function onDeactive(event: React.MouseEvent) {
    event.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("layout-item-activate-change", { detail: { id: null } })
    );
  }

  if (!hasChildren) {
    return (
      <div className="flex flex-col gap-0.5 text-sm border-l pl-4 relative before:left-0 before:top-5 before:absolute before:w-4 before:h-px before:bg-gray-200">
        <div className="flex font-medium items-center gap-2 p-2 -ml-1 hover:bg-gray-100 rounded-md">
          <Icon className="w-4 h-4" /> {label}
        </div>
      </div>
    );
  }

  return (
    <AccordionPrimitive.Root
      type="multiple"
      className={cn(
        "flex flex-col gap-0.5 text-sm",
        item.type !== "root" &&
          "border-l pl-4 relative before:left-0 before:top-5 before:absolute before:w-4 before:h-px before:bg-gray-200"
      )}
      onMouseOver={onActive}
      onMouseLeave={onDeactive}
    >
      <AccordionPrimitive.Item value={item.id}>
        <AccordionPrimitive.Header className="flex font-medium items-center gap-2 p-2 -ml-px hover:bg-gray-100 rounded-md">
          <AccordionPrimitive.Trigger asChild>
            <ChevronRightIcon className="w-5 h-5 origin-center transition-transform data-[state=open]:rotate-90" />
          </AccordionPrimitive.Trigger>
          <Icon className="w-4 h-4 text-gray-500" /> {label}
        </AccordionPrimitive.Header>

        <AccordionPrimitive.Content className="pl-4 flex flex-col">
          {item.children.map((child) => (
            <LayoutItem key={child.id} item={child} />
          ))}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
