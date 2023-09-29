import { MailItemType } from "@/store/mail/types";
import {
  BoxIcon,
  ColumnsIcon,
  ContainerIcon,
  HeadingIcon,
  ImageIcon,
  Link2Icon,
  MailboxIcon,
  MousePointerSquare,
  SplitSquareVerticalIcon,
  TextIcon,
} from "lucide-react";

import { useDraggable } from "@dnd-kit/core";
import { Column } from "@react-email/column";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Row } from "@react-email/row";
import { Text } from "@react-email/text";
import { PropsWithChildren, forwardRef } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const tools = [
  {
    type: MailItemType.Column,
    label: "Columns",
    icon: ColumnsIcon,
    component: Column,
  },
  {
    type: MailItemType.Section,
    label: "Section",
    icon: BoxIcon,
    component: Row,
  },
  {
    type: MailItemType.Container,
    label: "Container",
    icon: ContainerIcon,
    component: Container,
  },
  {
    type: MailItemType.Button,
    label: "Button",
    icon: MousePointerSquare,
    component: Button,
  },
  { type: MailItemType.Text, label: "Text", icon: TextIcon, component: Text },
  {
    type: MailItemType.Heading,
    label: "Heading",
    icon: HeadingIcon,
    component: Heading,
  },
  {
    type: MailItemType.Separator,
    label: "Separator",
    icon: SplitSquareVerticalIcon,
    component: Hr,
  },
  { type: MailItemType.Image, label: "Image", icon: ImageIcon, component: Img },
  { type: MailItemType.Link, label: "Link", icon: Link2Icon, component: Link },
];

export const toolsMap = tools.reduce(
  (all, tool) => ({ ...all, [tool.type]: tool }),
  {
    root: {
      type: "root",
      label: "Mail",
      icon: MailboxIcon,
      component: forwardRef<HTMLDivElement, PropsWithChildren<{ id: string }>>(
        (props, ref) => (
          <div>
            <style
              dangerouslySetInnerHTML={{
                __html: `
                [data-over=true]::before {
                  content: 'Drop here';
                  height: 80px;
                  width: 100%:
                }
               `,
              }}
            />
            <div id={props.id} data-item-type="root" ref={ref}>
              {props.children}
            </div>
          </div>
        )
      ),
    },
  } as Record<
    MailItemType | "root",
    Omit<(typeof tools)[number], "type"> & { type: "root" | MailItemType }
  >
);

export default function Toolbar() {
  return (
    <aside className="border-r pt-4">
      <TooltipProvider>
        <ul className="flex flex-col gap-3 items-center">
          {tools.map((tool) => (
            <li key={tool.type} className="w-9 h-9">
              <Tooltip>
                <TooltipTrigger>
                  <Tool {...tool} />
                </TooltipTrigger>

                <TooltipContent side="right" className="ml-1">
                  {tool.label}
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </aside>
  );
}

function Tool({ icon: Icon, label, type }: (typeof tools)[number]) {
  const { setNodeRef, transform, listeners, attributes, isDragging } =
    useDraggable({
      id: type,
      data: {
        type,
      },
    });

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={
        transform
          ? ({ "--x": `${transform.x}px`, "--y": `${transform.y}px` } as any)
          : undefined
      }
      className={cn(
        "tranform-gpu origin-top-left translate-x-[--x] translate-y-[--y]",
        isDragging ? "z-50 fixed" : ""
      )}
    >
      <Icon className="w-5 h-5" />
    </Button>
  );
}
