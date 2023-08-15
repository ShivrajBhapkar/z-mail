import { render } from "@react-email/render";
import { useAnimate } from "framer-motion";
import { ElementRef, RefObject, useEffect, useRef } from "react";

import Mail from "@/components/home/mail";
import uiStore from "@/store/ui/ui.store";
import { useProxy } from "valtio/utils";
import { useSnapshot } from "valtio";

export default function MailBox() {
  const ref = useRef<ElementRef<"iframe">>(null);
  const ui = useSnapshot(uiStore);

  return (
    <div className="flex justify-center relative overflow-hidden">
      <iframe
        ref={ref}
        title="Mail Preview"
        className="h-full w-full"
        srcDoc={render(<Mail />)}
      />

      {ui.interactiveMode ? (
        <>
          <FrameItemActivator iframeRef={ref} />
          <Highlighter getFrameDoc={() => ref.current} />
        </>
      ) : null}
    </div>
  );
}

function FrameItemActivator({
  iframeRef,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
}) {
  const ui = useProxy(uiStore);

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

      ui.selectedItemId = possibleMailItem.id;
    };

    _window.addEventListener("click", onClick);

    return () => _window.removeEventListener("click", onClick);
  }, [iframeRef]);

  return null;
}

function Highlighter({
  getFrameDoc,
}: {
  getFrameDoc: () => HTMLIFrameElement | undefined | null;
}) {
  const [ref, animate] = useAnimate();
  const ui = useSnapshot(uiStore);

  useEffect(() => {
    const iframe = getFrameDoc();

    if (!iframe?.contentDocument || !ui.hoveredItem) {
      animate(ref.current, { opacity: 0 });
      return;
    }

    const element = iframe.contentDocument.getElementById(ui.hoveredItem);

    if (!element) return;

    const rect = element.getBoundingClientRect();

    animate(ref.current, {
      x: rect.x,
      y: rect.y,
      scaleX: rect.width,
      scaleY: rect.height,
      opacity: 1,
    });
  }, [ui.hoveredItem]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 w-px h-px bg-indigo-500/50 origin-top-left"
    />
  );
}
