import { SidebarContext } from "#/context/sidebarContext";
import useWindowDimensions from "#/hooks/useWindowDimensions";
import { FoldersProps } from "#/pages/api/article";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

interface ContentProps {
  folders: any;
  children: React.ReactChild;
}

export default function Content({ folders, children }: ContentProps) {
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const Route = (data: string | undefined) => {
    if (data) {
      if (width < 1024) toggleSidebar(false);
      router.push(`/Docs${data}`);
    }
  };

  return !folders.children ? (
    <li>
      <a
        onClick={() => Route(folders.path)}
        className="flex cursor-pointer flex-row flex-nowrap items-center gap-2 truncate rounded-xl px-3 py-1.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        {children}
      </a>
    </li>
  ) : (
    <li>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger
          className={`${
            open ? "bg-slate-100 dark:bg-slate-800" : ""
          } flex w-full cursor-pointer flex-row flex-nowrap items-center gap-2 truncate rounded-xl px-3 py-1.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800`}
        >
          <a
            onClick={() => Route(folders.path)}
            className="flex w-full flex-row items-center gap-2 truncate"
          >
            {children}
          </a>
          <ChevronRight
            size={16}
            className={`transition-all ${open ? "rotate-90" : ""}`}
          />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <ul className="ml-4 mt-1 flex flex-col gap-1">
            {folders.children
              .sort(
                (a: any, b: any) => a.metadata.position - b.metadata.position
              )
              .map((item: FoldersProps, index: number) => {
                return !item.children ? (
                  <li key={index}>
                    <a
                      onClick={() => Route(item.path)}
                      className="flex cursor-pointer flex-row flex-nowrap items-center justify-start gap-2 truncate rounded-xl px-3 py-1.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <span>{item.metadata.title ?? item.name}</span>
                    </a>
                  </li>
                ) : (
                  <Content folders={item} key={index}>
                    <>
                      <span>{item.name}</span>
                    </>
                  </Content>
                );
              })}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  );
}
