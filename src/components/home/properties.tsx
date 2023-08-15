import { RootItem, useMailContext } from "@/store/mail";
import uiStore from "@/store/ui";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { useMemo } from "react";
import { useProxy } from "valtio/utils";

const getMailItem = ($mail: RootItem, id: string) =>
  id === $mail.id ? $mail : $mail.items[id];

export default function Properties() {
  const ui = useProxy(uiStore);
  const { $mail } = useMailContext();

  const active = ui.selectedItemId
    ? getMailItem($mail.value, ui.selectedItemId)
    : $mail.value;

  const paths = useMemo(() => {
    let current = active;
    const _paths = [];
    while (current?.parentId) {
      _paths.push({ id: current.id, type: current.type });
      current = $mail.value.items[current.parentId];
    }
    _paths.reverse().pop();
    return _paths;
  }, [$mail, active]);

  return (
    <div className="py-3 flex flex-col gap-3">
      {paths.length ? (
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center whitespace-nowrap min-w-0"
          aria-label="Breadcrumb"
        >
          {paths.map((path) => (
            <li className="text-sm text-gray-500 font-medium hover:text-blue-600 last:text-gray-900">
              <button
                className="flex items-center"
                onClick={() => {
                  ui.selectedItemId = path.id;
                }}
              >
                <ChevronRightIcon size={14} className="mt-0.5 mx-1" />
                <span>{path.type}</span>
              </button>
            </li>
          ))}
        </motion.ol>
      ) : null}

      <section className="px-3">
        <motion.h3
          className="capitalize text-lg font-semibold"
          layoutId={active.id}
        >
          {active.type === "root" ? "Mail" : active.type}
        </motion.h3>
      </section>
    </div>
  );
}
