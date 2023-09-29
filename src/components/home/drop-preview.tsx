import { cn } from "@/lib/utils";
import { useDndContext } from "@dnd-kit/core";
import { useMemo } from "react";

export default function DropPreview() {
  const { droppableRects, droppableContainers, active, over } = useDndContext();

  const acceptables = useMemo(
    () =>
      [...droppableRects.entries()].filter(([id]) => {
        return droppableContainers
          .get(id)
          ?.data.current?.accepts.includes(active?.id);
      }),
    [active?.id, droppableRects, droppableContainers]
  );

  if (!active?.id) {
    return null;
  }

  return (
    <>
      <div className="absolute inset-0 opacity-0" />
      {acceptables.map(([id, rect = {}]) => (
        <div
          key={id}
          data-preview-for={id}
          style={{ ...rect }}
          className={cn(
            "absolute font-semibold text-lg backdrop-blur-sm text-emerald-800 bg-emerald-100/60 border-2 border-dashed border-emerald-800 flex items-center justify-center z-[40] transition-colors",
            over?.id === id && "bg-emerald-100"
          )}
        >
          Drop the {active?.data.current?.type} on this{" "}
          {droppableContainers.get(id)?.data.current?.type}
        </div>
      ))}
    </>
  );
}
