import { useSnapshot } from "valtio";
import uiStore from "@/store/ui";
import { useMailContext } from "@/store/mail";

export default function Properties() {
  const ui = useSnapshot(uiStore);
  const { $mail } = useMailContext();

  const item =
    !ui.selectedItemId || ui.selectedItemId === $mail.value.id
      ? $mail.value
      : $mail.value.items[ui.selectedItemId];

  return <pre>{JSON.stringify(item, null, 2)}</pre>;
}
