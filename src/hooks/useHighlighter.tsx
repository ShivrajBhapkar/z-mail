import { hoveredItemAtom } from "@/store/ui";
import { useAnimate } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function useHighlighter({ frameId }: { frameId: string }) {
  const [scope, animate] = useAnimate();
  const hoveredItemId = useAtomValue(hoveredItemAtom);

  useEffect(() => {
    const frame = document.getElementById(frameId) as HTMLIFrameElement;
    const doc = frame?.contentDocument;
    if (!doc) return;

    if (!hoveredItemId) {
      animate(scope.current, {
        opacity: 0,
        display: "none",
      });
      return;
    }

    const element = doc.getElementById(hoveredItemId);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    animate(scope.current, {
      x: rect.x,
      y: rect.y,
      scaleX: rect.width,
      scaleY: rect.height,
      opacity: 1,
      display: "block",
    });
  }, [hoveredItemId]);

  return {
    scope,
  };
}

export function Highlight({ frameId }: { frameId: string }) {
  const { scope } = useHighlighter({ frameId });

  return (
    <div
      ref={scope}
      className="absolute left-0 top-0 w-px h-px bg-indigo-500/50 origin-top-left"
    />
  );
}
