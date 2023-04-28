import * as Tooltip from "@radix-ui/react-tooltip";
import { Moon, Sun } from "lucide-react";

export default function Dark({
  setDark,
  dark,
}: {
  setDark: () => void;
  dark: boolean;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          className={`rounded-xl p-1.5 hover:bg-slate-200 hover:dark:bg-slate-800`}
          onClick={setDark}
        >
          <span className="sr-only">Darkmode for Preview</span>
          {dark ? <Sun size={18} /> : <Moon size={20} />}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            className="z-40 rounded-xl border border-slate-300 bg-white py-1 px-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            Toggle Darkmode.
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
