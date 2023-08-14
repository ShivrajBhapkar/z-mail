import { MailItemType } from "@/store/mail/types";
import {
  BoxIcon,
  ColumnsIcon,
  ContainerIcon,
  HeadingIcon,
  ImageIcon,
  Link2Icon,
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

export const tools = [
  { type: MailItemType.Column, label: "Columns", icon: ColumnsIcon },
  { type: MailItemType.Section, label: "Section", icon: BoxIcon },
  { type: MailItemType.Container, label: "Container", icon: ContainerIcon },
  { type: MailItemType.Button, label: "Button", icon: MousePointerSquare },
  { type: MailItemType.Text, label: "Text", icon: TextIcon },
  { type: MailItemType.Heading, label: "Heading", icon: HeadingIcon },
  {
    type: MailItemType.Separator,
    label: "Separator",
    icon: SplitSquareVerticalIcon,
  },
  { type: MailItemType.Image, label: "Image", icon: ImageIcon },
  { type: MailItemType.Link, label: "Link", icon: Link2Icon },
];

export const toolsMap = tools.reduce(
  (all, tool) => ({ ...all, [tool.type]: tool }),
  {} as Record<MailItemType, (typeof tools)[number]>
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
