import * as Portal from "@radix-ui/react-portal";
import { useAtomValue } from "jotai";
import { useId, useState } from "react";

import Mail from "@/components/home/mail";
import { Highlight } from "@/hooks/useHighlighter";
import { prettyMailAtom } from "@/store/mail";
import { interactiveModeAtom } from "@/store/ui";

export default function MailBox() {
  const id = useId();

  const [loaded, setLoaded] = useState(false);

  const mail = useAtomValue(prettyMailAtom);
  const isInteractiveMode = useAtomValue(interactiveModeAtom);

  return (
    <div className="flex justify-center relative overflow-hidden">
      <iframe
        id={id}
        title="Mail Preview"
        className="h-full w-full"
        onLoad={() => {
          setLoaded(true);
        }}
      />

      {loaded && mail ? (
        <>
          <Portal.Root container={getFrame(id)?.contentDocument?.body}>
            <Mail node={mail} />
          </Portal.Root>

          {isInteractiveMode ? <Highlight frameId={id} /> : null}
        </>
      ) : null}
    </div>
  );
}

function getFrame(id: string) {
  return document.getElementById(id) as HTMLIFrameElement | undefined;
}
