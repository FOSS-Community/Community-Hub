import * as Tooltip from "@radix-ui/react-tooltip";
import { Laptop, Smartphone, Tablet } from "lucide-react";

const desktop = 1500;
const tablet = 768;
const mobile = 425;

export function PhoneScreen({
  size,
  setSize,
}: {
  size: number;
  setSize: (size: number) => void;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={() => setSize(mobile)}
          className={`rounded-xl p-1.5 hover:bg-slate-200 hover:dark:bg-slate-800 ${
            size == mobile && "bg-slate-200 dark:bg-slate-800"
          }`}
        >
          <Smartphone size={20} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            className="z-40 rounded-xl border border-slate-300 bg-white py-1 px-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            Screen Size: {mobile}px
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function TabletScreen({
  size,
  setSize,
}: {
  size: number;
  setSize: (size: number) => void;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={() => setSize(tablet)}
          className={`${
            size == tablet && "bg-slate-200 dark:bg-slate-800"
          } rounded-xl p-1.5 hover:bg-slate-200 hover:dark:bg-slate-800`}
        >
          <Tablet size={20} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            className="z-40 rounded-xl border border-slate-300 bg-white py-1 px-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            Screen Size: {tablet}px
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function ComputerScreen({
  size,
  setSize,
}: {
  size: number;
  setSize: (size: number) => void;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={() => setSize(desktop)}
          className={`${
            size == desktop && "bg-slate-200 dark:bg-slate-800"
          } rounded-xl p-1.5 hover:bg-slate-200 hover:dark:bg-slate-800`}
        >
          <Laptop size={20} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            className="z-40 rounded-xl border border-slate-300 bg-white py-1 px-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            Screen Size: {desktop}px
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
