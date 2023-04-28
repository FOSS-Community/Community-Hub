import { DarkmodeContext } from "#/context/darkmodeContext";
import corndocsConfig from "#/corndocs.config.js";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";

export default function DarkToggle() {
  /* @ts-ignore */
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);

  if (!corndocsConfig.darkMode) return null;

  return (
    <button
      className={`rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
      onClick={() => toggleDarkmode()}
    >
      <span className="sr-only">Navigation</span>
      {darkmode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
