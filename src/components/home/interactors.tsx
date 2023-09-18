import { useAnimate } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { RefObject, useEffect } from "react";

import { activeItemAtom, hoveredItemAtom } from "@/store/ui";

export function Interactors({
  iframeRef,
  srcdoc,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  srcdoc: string;
}) {
  return (
    <>
      <FrameItemActivator iframeRef={iframeRef} srcdoc={srcdoc} />
      <Highlighter iframeRef={iframeRef} />
    </>
  );
}

function FrameItemActivator({
  iframeRef,
  srcdoc,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  srcdoc: string;
}) {
  const setActiveItem = useSetAtom(activeItemAtom);

  useEffect(() => {
    const _window = iframeRef.current?.contentWindow;
    if (!_window) return;

    const onClick = (e: MouseEvent) => {
      const path = e.composedPath();

      let possibleMailItem: HTMLElement | undefined;

      for (const pathItem of path) {
        if (
          "hasAttribute" in pathItem &&
          typeof pathItem.hasAttribute === "function" &&
          pathItem.hasAttribute("data-item-type")
        ) {
          possibleMailItem = pathItem as HTMLElement;
          break;
        }
      }

      if (!possibleMailItem) return;

      setActiveItem(possibleMailItem.id);
    };

    _window.addEventListener("click", onClick);

    return () => _window.removeEventListener("click", onClick);
  }, [iframeRef, srcdoc]);

  return null;
}

export function Highlighter({
  iframeRef,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
}) {
  const [ref, animate] = useAnimate();

  const hoveredItem = useAtomValue(hoveredItemAtom);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!ref.current) {
      return;
    }

    console.log(ref.current);

    if (!iframe?.contentDocument || !hoveredItem) {
      animate(ref.current, {
        opacity: 0,
        display: "none",
      });
      return;
    }

    const element = iframe.contentDocument.getElementById(hoveredItem);

    if (!element) return;

    const rect = element.getBoundingClientRect();

    animate(ref.current, {
      display: "block",
      x: rect.x,
      y: rect.y,
      scaleX: rect.width,
      scaleY: rect.height,
      opacity: 1,
    });
  }, [hoveredItem, iframeRef]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 w-px h-px bg-indigo-500/50 origin-top-left"
    />
  );
}
