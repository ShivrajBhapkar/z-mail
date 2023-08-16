import { ElementRef, useRef } from "react";
import { render } from "@react-email/render";

import Mail from "@/components/home/mail";
import { Interactors } from "./interactors";

export default function MailBox() {
  const ref = useRef<ElementRef<"iframe">>(null);

  return (
    <div className="flex justify-center relative overflow-hidden">
      <iframe
        ref={ref}
        title="Mail Preview"
        className="h-full w-full"
        srcDoc={render(<Mail />)}
      />

      <Interactors iframeRef={ref} />
    </div>
  );
}
