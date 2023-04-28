import useWindowDimensions from "#/hooks/useWindowDimensions";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Album, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Headings {
  text: string;
  level: number;
  id: string;
}

interface SidebarProps {
  headings: Headings[];
  children?: React.ReactChild | null;
}

export default function ArticleSidebar({ children, headings }: SidebarProps) {
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  if (headings.length == 0) return null;

  return width > 1028 ? (
    <aside className="col-span-12 space-y-8 lg:col-span-4 xl:col-start-10">
      <div className="space-y-8 lg:sticky lg:top-[6.5rem] lg:mb-16">
        <div className="hidden lg:block">
          <div className="space-y-8 py-8 lg:py-0">
            <div className="px-8 dark:text-white">
              <p className="flex w-full flex-row gap-2 rounded-xl pb-6 font-bold">
                On this page
              </p>
              <nav className="w-full text-sm lg:leading-6">
                <ul className="w-full space-y-2">
                  {headings.map((item: Headings, index: number) => {
                    return (
                      <li key={index} className="w-full">
                        <a
                          href={`#${item.id}`}
                          className={`jusify-between flex w-full flex-none flex-row items-center gap-2 hover:text-primary-500 ${
                            item.level == 2 ? "font-bold" : `pl-2`
                          }`}
                        >
                          <span className="flex w-full flex-row items-center gap-2">
                            {item.text}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                {children}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </aside>
  ) : (
    <Collapsible.Root
      open={open}
      className="mb-4 overflow-hidden rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    >
      <Collapsible.Trigger
        className={`${
          open ? "border-b" : ""
        } flex w-full flex-row items-center border-slate-300 px-4 py-2 text-left font-bold dark:border-slate-700`}
        onClick={() => setOpen(!open)}
      >
        <span className="flex flex-1 flex-row items-center gap-2">
          <Album size={16} />
          On This Page
        </span>
        <ChevronRight size={16} />
      </Collapsible.Trigger>
      <Collapsible.Content className="relative bg-white px-4 pt-2 pb-4 dark:bg-slate-900">
        <ul className="relative z-10 w-full space-y-1 overflow-hidden pb-2">
          {headings.map((item: Headings, index: number) => {
            return (
              <li key={index}>
                <a
                  href={`#${item.id}`}
                  className={`jusify-between flex w-full flex-none flex-row items-center gap-2 hover:text-primary-500 ${
                    item.level == 2 ? "pt-1.5 font-bold" : `ml-1`
                  }`}
                >
                  <span className="flex w-full flex-row items-center gap-2">
                    {item.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
