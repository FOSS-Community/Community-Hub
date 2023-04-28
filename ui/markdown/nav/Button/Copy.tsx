import * as Tooltip from "@radix-ui/react-tooltip";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Copy({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          className={`rounded-xl p-1.5 hover:bg-slate-200 hover:dark:bg-slate-800`}
        >
          <CopyToClipboard text={text} onCopy={() => setIsCopied(true)}>
            {isCopied ? (
              <ClipboardCheck size={18} className="text-emerald-600" />
            ) : (
              <Clipboard size={18} />
            )}
          </CopyToClipboard>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            className="z-40 rounded-xl border border-slate-300 bg-white py-1 px-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            Copy to clipboard.
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
