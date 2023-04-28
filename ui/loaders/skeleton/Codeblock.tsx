import Copy from "#/ui/markdown/nav/Button/Copy";
import Dark from "#/ui/markdown/nav/Button/Dark";
import {
  ComputerScreen,
  PhoneScreen,
  TabletScreen,
} from "#/ui/markdown/nav/Button/Size";

const size = 0;
const array = Array.from(Array(24).keys());

export default function CodeblockSkeleton({ preview }: { preview: boolean }) {
  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700">
      {preview && (
        <div className="flex flex-row flex-wrap gap-2 border-b border-slate-300 p-4 dark:border-slate-700">
          {array.map((i) => (
            <div
              key={i}
              className="mb-4 h-4 rounded-xl bg-slate-200 dark:bg-slate-700"
              style={{ width: `${Math.floor(Math.random() * 16)}rem` }}
            />
          ))}
        </div>
      )}
      <div className="flex h-10 w-full items-center justify-between gap-4 border-b border-slate-300 py-1 px-4 dark:border-slate-700 dark:text-white">
        <p className="border-r border-slate-300 pr-4 text-sm font-bold capitalize dark:border-slate-700">
          html
        </p>
        <nav className="relative flex h-full flex-1 flex-row items-center gap-2">
          {preview && (
            <>
              <div className="flex h-full w-full flex-row items-center gap-2">
                <PhoneScreen size={size} setSize={() => {}} />
                <TabletScreen size={size} setSize={() => {}} />
                <ComputerScreen size={size} setSize={() => {}} />
              </div>
              <Dark dark={true} setDark={() => {}} />
              <Copy text={""} />
            </>
          )}
        </nav>
      </div>
      <div className="relative">
        <pre
          className={`language-html line-numbers h-full max-h-[48rem] w-full overflow-auto`}
        >
          <code className="flex flex-row flex-wrap gap-2">
            {array.map((i) => (
              <div
                key={i}
                className="mb-4 h-4 rounded-xl bg-slate-200 dark:bg-slate-700"
                style={{ width: `${Math.floor(Math.random() * 16)}rem` }}
              />
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
