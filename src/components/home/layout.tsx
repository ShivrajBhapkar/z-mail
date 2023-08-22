import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ChevronRightIcon, MailIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { MailTreeNode, prettyMailAtom } from "@/store/mail";
import {
  activeItemAtom,
  hoveredItemAtom,
  interactiveModeAtom,
} from "@/store/ui";

import { Switch } from "../ui/switch";
import { toolsMap } from "./toolbar";

export default function Layout() {
  const mail = useAtomValue(prettyMailAtom);

  return (
    <div className="flex flex-col">
      <Interactivity />
      {mail ? <LayoutItem item={mail} /> : null}
    </div>
  );
}

function Interactivity() {
  const [interactiveMode, setInteractiveMode] = useAtom(interactiveModeAtom);

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      <Switch
        id="highlight-on-hover"
        className="data-[state=checked]:bg-indigo-600"
        checked={interactiveMode}
        onCheckedChange={(value) => {
          setInteractiveMode(value);
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

function LayoutItem({ item: node }: { item: MailTreeNode }) {
  const interactiveMode = useAtomValue(interactiveModeAtom);
  const setHoveredItem = useSetAtom(hoveredItemAtom);
  const setActiveItem = useSetAtom(activeItemAtom);

  const { icon: Icon, label } =
    node.type === "root"
      ? { icon: MailIcon, label: "Mail" }
      : toolsMap[node.type];

  function onHover(e: React.MouseEvent) {
    e.stopPropagation();
    setHoveredItem(node.id);
  }

  function onUnHover(e: React.MouseEvent) {
    e.stopPropagation();
    setHoveredItem((pre) => (pre === node.id ? null : pre));
  }

  if (!node.children) {
    return (
      <button
        type="button"
        onClick={() => setActiveItem(node.id)}
        className="flex flex-col gap-0.5 text-sm w-full border-l pl-4 relative before:left-0 before:top-5 before:absolute before:w-4 before:h-px before:bg-gray-200"
      >
        <div className="flex font-medium items-center gap-2 p-2 -ml-1 hover:bg-gray-100 rounded-md w-full">
          <Icon className="w-4 h-4" /> {label}
        </div>
      </button>
    );
  }

  return (
    <AccordionPrimitive.Root
      type="multiple"
      className={cn(
        "flex flex-col gap-0.5 text-sm",
        node.type !== "root" &&
          "border-l pl-4 relative before:left-0 before:top-5 before:absolute before:w-4 before:h-px before:bg-gray-200"
      )}
      onMouseOver={interactiveMode ? onHover : undefined}
      onMouseLeave={interactiveMode ? onUnHover : undefined}
    >
      <AccordionPrimitive.Item value={node.id}>
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger className="flex items-center gap-2 w-full font-medium group p-2 -ml-px hover:bg-gray-100 rounded-md">
            <ChevronRightIcon className="w-5 h-5 origin-center transition-transform group-data-[state=open]:rotate-90" />
            <Icon className="w-4 h-4 text-gray-500" /> {label}
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>

        <AccordionPrimitive.Content className="pl-4 flex flex-col">
          {node.children.map((child) => (
            <LayoutItem key={child.id} item={child} />
          ))}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
