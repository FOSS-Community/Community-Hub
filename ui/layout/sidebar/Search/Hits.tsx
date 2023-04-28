import { Combobox } from "@headlessui/react";
import { connectStateResults, Highlight } from "react-instantsearch-dom";

interface HitsProps {
  searchState: {
    query: string;
    page: number;
  };
  searchResults: any;
}

interface HeadingsProps {
  text: string;
  level: number;
}

interface OptionProp {
  description: string;
  heading: HeadingsProps[];
  objectID: string;
  path: string;
  slug: string;
  title: string;
}

const Hits = ({ searchState, searchResults }: HitsProps) => {
  if (!searchState.query || searchState.query.length == 0) return null;

  return (
    <>
      {searchResults.hits.length === 0 && (
        <p className="flex flex-row items-center justify-between gap-4 rounded-xl px-4 py-2 text-sm text-slate-700 ">
          Shoot! We don&apos;t seem to have what you&apos;re looking for.
        </p>
      )}
      {searchResults.hits.length > 0 && (
        <div className="max-h-56 overflow-y-auto md:max-h-[20rem]">
          <Combobox.Options className="w-full p-4">
            {searchResults.hits.map((hit: OptionProp) => (
              <Combobox.Option key={hit.objectID} value={`/Docs/${hit.path}`}>
                {({ active, selected }) => (
                  <div
                    className={`flex flex-row items-center justify-between gap-4 rounded-xl px-4 py-2 text-sm text-slate-700 ${
                      active && "border-2 border-primary-300"
                    }`}
                  >
                    <p className="flex flex-1 flex-col truncate dark:text-white">
                      <span className="truncate break-all font-bold">
                        <Highlight attribute="title" hit={hit} />
                      </span>
                      <span className="truncate">
                        <Highlight attribute="description" hit={hit} />
                      </span>
                    </p>
                    {active && (
                      <p className="hidden flex-shrink-0 md:inline-block">
                        <kbd className="rounded-xl border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:border-slate-500 dark:bg-slate-700 dark:text-white">
                          Enter
                        </kbd>
                      </p>
                    )}
                  </div>
                )}
              </Combobox.Option>
            ))}
            {/* // <li className="flex flex-col rounded-xl px-4 py-2 text-sm text-slate-700">
              //   <span className="font-bold">Title</span>
              //   <span>Description</span>
              // </li> */}
          </Combobox.Options>
        </div>
      )}
      <div className="hidden h-10 items-center gap-2 border-t border-slate-300 px-2 dark:border-slate-700 md:flex">
        <p className="text-xs font-semibold text-slate-600 dark:text-white">
          Navigation:
        </p>
        <div className="space-x-1">
          <kbd className="rounded-xl border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:border-slate-500 dark:bg-slate-700 dark:text-white">
            ↑
          </kbd>
          <kbd className="rounded-xl border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:border-slate-500 dark:bg-slate-700 dark:text-white">
            ↓
          </kbd>
        </div>
      </div>
    </>
  );
};

export default connectStateResults(Hits);
