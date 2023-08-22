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

import * as ToolbarPrimitive from "@radix-ui/react-toolbar";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Column } from "@react-email/column";
import { Section } from "@react-email/section";
import { Hr } from "@react-email/hr";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { PropsWithChildren } from "react";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";

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
    component: Section,
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
      component: (props: PropsWithChildren<{ id: string }>) => (
        <div id={props.id}>{props.children}</div>
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
        <ToolbarPrimitive.Root
          orientation="vertical"
          className="flex flex-col gap-3 items-center"
        >
          {tools.map(({ icon: Icon, label, type }) => (
            <Tooltip key={type}>
              <TooltipTrigger asChild>
                <ToolbarPrimitive.Button asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                </ToolbarPrimitive.Button>
              </TooltipTrigger>

              <TooltipContent side="right" className="ml-1">
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </ToolbarPrimitive.Root>
      </TooltipProvider>
    </aside>
  );
}
