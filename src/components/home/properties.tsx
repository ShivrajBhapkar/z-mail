import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

import { mailAtom } from "@/store/mail";
import { activeItemAtom } from "@/store/ui";

export default function Properties() {
  const [mail, setMail] = useAtom(mailAtom);
  const activeId = useAtomValue(activeItemAtom);
  const activeItem = useMemo(
    () => mail.items[activeId ?? mail.rootId],
    [activeId, mail]
  );

  return (
    <div className="w-full max-w-full">
      <pre>{JSON.stringify(activeItem, null, 2)}</pre>
    </div>
  );
}
