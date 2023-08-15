import { render } from "@react-email/render";
import { useAnimate } from "framer-motion";
import { ElementRef, useEffect, useRef } from "react";

import Mail from "@/components/home/mail";
import uiStore from "@/store/ui/ui.store";
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
        <Highlighter getFrameDoc={() => ref.current} />
      ) : null}
    </div>
  );
}

function Highlighter({
  getFrameDoc,
}: {
  getFrameDoc: () => HTMLIFrameElement | undefined | null;
}) {
  const [ref, animate] = useAnimate();

  useEffect(() => {
    function onActivate(e: Event): void {
      const iframe = getFrameDoc();

      if (
        !(e instanceof CustomEvent) ||
        !e.detail.id ||
        !iframe?.contentDocument
      ) {
        animate(ref.current, { opacity: 0 });
        return;
      }

      const { id } = e.detail;
      const element = iframe.contentDocument.getElementById(id);

      if (!element) return;

      const rect = element.getBoundingClientRect();

      animate(ref.current, {
        x: rect.x,
        y: rect.y,
        scaleX: rect.width,
        scaleY: rect.height,
        opacity: 1,
      });
    }

    window.addEventListener("layout-item-activate-change", onActivate);

    return () =>
      window.removeEventListener("layout-item-activate-change", onActivate);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 w-px h-px bg-indigo-500/50 origin-top-left"
    />
  );
}
