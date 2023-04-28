import { CommandContext } from "#/context/commandContext";
import { DarkmodeContext } from "#/context/darkmodeContext";
import { SidebarContext } from "#/context/sidebarContext";
import corndocsConfig from "#/corndocs.config";
import useWindowDimensions from "#/hooks/useWindowDimensions";
import Hits from "#/ui/layout/sidebar/Search/Hits";
import SearchBox from "#/ui/layout/sidebar/Search/Search";
import { Combobox } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import algoliasearch from "algoliasearch/lite";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { InstantSearch } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  corndocsConfig?.search?.algolia_app_id
    ? corndocsConfig.search.algolia_app_id
    : "",
  corndocsConfig?.search?.algolia_search_api_key
    ? corndocsConfig.search.algolia_search_api_key
    : ""
);

export default function SearchButton() {
  const router = useRouter();

  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);
  /* @ts-ignore */
  const { command, toggleCommand } = useContext(CommandContext);
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);
  const { height, width } = useWindowDimensions();

  const handleChange = (e: string) => {
    router.push(e);
    toggleCommand();
    if (width < 1028) toggleSidebar(false);
  };

  if (!corndocsConfig.search) return null;

  return (
    <>
      <button
        onClick={() => toggleCommand()}
        className="flex h-10 w-full flex-row items-center gap-2 truncate rounded-xl border border-slate-300 pl-4 pr-2 text-left text-sm text-slate-500 outline-none hover:ring-2 hover:ring-primary-300 hover:ring-offset-2 hover:ring-offset-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:ring-offset-slate-800"
      >
        <Search size={16} className="flex-none" />
        <span className="flex-1">Search Docs...</span>
        <kbd className="rounded-xl border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:border-slate-500 dark:bg-slate-700 dark:text-white">
          CTRL + K
        </kbd>
      </button>

      <Dialog.Root open={command} onOpenChange={() => toggleCommand()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[1000] grid place-content-center bg-slate-900/50" />
          <Dialog.Content
            className={`${
              darkmode ? "dark" : ""
            } fixed top-0 left-1/2 z-[1001] w-full max-w-xl origin-top -translate-x-1/2 p-4 md:top-1/4`}
          >
            <div className="relative mx-auto overflow-hidden rounded-xl border border-slate-300 bg-white ring-2 ring-primary-300 ring-offset-2 ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:ring-offset-slate-800">
              <Combobox onChange={(e: string) => handleChange(e)}>
                <InstantSearch
                  searchClient={searchClient}
                  indexName={corndocsConfig.search.algolia_index}
                >
                  <SearchBox />
                  <Hits />
                </InstantSearch>
              </Combobox>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
