import { useAnimate } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { RefObject, useEffect } from "react";

import { activeItemAtom, hoveredItemAtom } from "@/store/ui";

export function Interactors({
  iframeRef,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
}) {
  return (
    <>
      <FrameItemActivator iframeRef={iframeRef} />
      <Highlighter iframeRef={iframeRef} />
    </>
  );
}

function FrameItemActivator({
  iframeRef,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
}) {
  const setActiveItem = useSetAtom(activeItemAtom);

  useEffect(() => {
    const _window = iframeRef.current?.contentWindow;
    if (!_window) return;

    const onClick = (e: MouseEvent) => {
      const path = e.composedPath();

      console.log(path);

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

    iframeRef.current.addEventListener("load", () => {
      _window.addEventListener("click", onClick);
    });

    return () => _window.removeEventListener("click", onClick);
  }, [iframeRef]);

  return null;
}

function Highlighter({
  iframeRef,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
}) {
  const [ref, animate] = useAnimate();

  const hoveredItem = useAtomValue(hoveredItemAtom);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe?.contentDocument || !hoveredItem) {
      animate(ref.current, { opacity: 0 });
      return;
    }

    const element = iframe.contentDocument.getElementById(hoveredItem);

    if (!element) return;

    const rect = element.getBoundingClientRect();

    animate(ref.current, {
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
