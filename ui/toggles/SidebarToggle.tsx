import { SidebarContext } from "#/context/sidebarContext";
import { Menu, X } from "lucide-react";
import { useContext } from "react";

export default function SidebarToggle() {
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);

  return (
    <button
      type="button"
      className="rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800"
      onClick={() => toggleSidebar()}
    >
      <span className="sr-only">Navigation</span>
      {sidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}
