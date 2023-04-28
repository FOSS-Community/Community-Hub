import { CommandContext } from "#/context/commandContext";
import { Combobox } from "@headlessui/react";
import { Search } from "lucide-react";
import { useContext } from "react";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ refine }: any) => {
  /* @ts-ignore */
  const { command, toggleCommand } = useContext(CommandContext);

  return (
    <div className="relative" role="search">
      <Combobox.Input
        className="peer flex h-12 w-full flex-row items-center gap-2 truncate border-b border-slate-300 pl-10 pr-16 text-left text-base text-slate-900 outline-none placeholder:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-200"
        id="algolia_search"
        type="search"
        placeholder="Search Docs"
        onChange={(e) => refine(e.currentTarget.value)}
        autoComplete="off"
      />
      <Search
        className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 peer-focus:text-slate-900 dark:text-slate-200 dark:peer-focus:text-slate-50"
        size={16}
      />
      <button
        onClick={() => toggleCommand()}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-xl border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:border-slate-500 dark:bg-slate-700 dark:text-white"
      >
        <kbd>Esc</kbd>
      </button>
    </div>
  );
};

export default connectSearchBox(SearchBox);
