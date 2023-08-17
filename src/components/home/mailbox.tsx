import { ElementRef, useMemo, useRef } from "react";
import { useAtomValue } from "jotai";
import { render } from "@react-email/render";

import Mail from "@/components/home/mail";
import { Interactors } from "./interactors";
import { mailAtom } from "@/store/mail";

export default function MailBox() {
  const ref = useRef<ElementRef<"iframe">>(null);
  const $mail = useAtomValue(mailAtom);
  const srcdoc = useMemo(
    () => render(<Mail $mail={$mail} item={$mail} />),
    [$mail]
  );

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
