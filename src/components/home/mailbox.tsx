import { render } from "@react-email/render";
import { useAtomValue } from "jotai";
import { ElementRef, useMemo, useRef } from "react";

import Mail from "@/components/home/mail";
import { prettyMailAtom } from "@/store/mail";
import { Interactors } from "./interactors";

export default function MailBox() {
  const ref = useRef<ElementRef<"iframe">>(null);
  const mail = useAtomValue(prettyMailAtom);
  const srcdoc = useMemo(() => render(<Mail node={mail} />), [mail]);

  return (
    <div className="flex justify-center relative overflow-hidden">
      <iframe
        ref={ref}
        title="Mail Preview"
        className="h-full w-full"
        srcDoc={srcdoc}
      />

      <Interactors iframeRef={ref} srcdoc={srcdoc} />
    </div>
  );
}
