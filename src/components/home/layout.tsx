import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRightIcon, MailIcon } from "lucide-react";
import { useSnapshot } from "valtio";
import { useProxy } from "valtio/utils";

import { cn } from "@/lib/utils";
import { useMailContext, type AnyEmailItem, type RootItem } from "@/store/mail";
import uiStore from "@/store/ui/ui.store";

import { Switch } from "../ui/switch";
import { toolsMap } from "./toolbar";

export default function Layout() {
  const { $mail } = useMailContext();

  return (
    <div className="flex flex-col">
      <Interactivity />
      <LayoutItem item={$mail.value} />
    </div>
  );
}

function Interactivity() {
  const ui = useSnapshot(uiStore);

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      <Switch
        id="highlight-on-hover"
        className="data-[state=checked]:bg-indigo-600"
        checked={ui.interactiveMode}
        onCheckedChange={(value) => {
          uiStore.interactiveMode = value;
        }}
      />
      <label
        htmlFor="highlight-on-hover"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Enable Interactive Mode
      </label>

      <small className="w-full text-gray-500 -mt-1 opacity-100">
        In the Interactive mode, when hovering over any of the items below, the
        corresponding element within the email preview will be highlighted for
        your attention.
      </small>
    </div>
  );
}

function LayoutItem({ item }: { item: RootItem | AnyEmailItem }) {
  const { $mail } = useMailContext();

  const ui = useProxy(uiStore);

  const hasChildren = "children" in item;

  const { icon: Icon, label } =
    item.type === "root"
      ? { icon: MailIcon, label: "Mail" }
      : toolsMap[item.type];

  function onActive(event: React.MouseEvent) {
    event.stopPropagation();
    ui.hoveredItem = item.id;
  }

  function onDeactive(event: React.MouseEvent) {
    if (ui.hoveredItem === item.id) {
      event.stopPropagation();
      ui.hoveredItem = null;
    }
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
      onMouseOver={ui.interactiveMode ? onActive : undefined}
      onMouseLeave={ui.interactiveMode ? onDeactive : undefined}
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
            <LayoutItem key={child} item={$mail.value.items[child]} />
          ))}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
