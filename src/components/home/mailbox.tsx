import { ElementRef, RefObject, useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
import { render } from "@react-email/render";
import { Show, useObserveEffect } from "@legendapp/state/react";

import Mail from "@/components/home/mail";
import { useUI } from "@/store/ui/ui.store";

export default function MailBox() {
  const ref = useRef<ElementRef<"iframe">>(null);
  const ui = useUI();

  return (
    <div className="flex justify-center relative overflow-hidden">
      <iframe
        ref={ref}
        title="Mail Preview"
        className="h-full w-full"
        srcDoc={render(<Mail />)}
      />

      <Show if={ui.interactiveMode}>
        <FrameItemActivator iframeRef={ref} />
        <Highlighter getFrameDoc={() => ref.current} />
      </Show>
    </div>
  );
}

function FrameItemActivator({
  iframeRef,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
}) {
  const ui = useUI();

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

      ui.selectedItem.set(possibleMailItem.id);
    };

    iframeRef.current.addEventListener("load", () => {
      _window.addEventListener("click", onClick);
    });

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
  const ui = useUI();

  useObserveEffect(() => {
    const iframe = getFrameDoc();

    if (!iframe?.contentDocument || !ui.hoveredItem.get()) {
      animate(ref.current, { opacity: 0 });
      return;
    }

    const element = iframe.contentDocument.getElementById(ui.hoveredItem.get());

    if (!element) return;

    const rect = element.getBoundingClientRect();

    animate(ref.current, {
      x: rect.x,
      y: rect.y,
      scaleX: rect.width,
      scaleY: rect.height,
      opacity: 1,
    });
  });

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 w-px h-px bg-indigo-500/50 origin-top-left"
    />
  );
}
