import corndocsConfig from "#/corndocs.config.js";
import Logo from "#/ui/layout/nav/Logo";
import DarkToggle from "#/ui/toggles/DarkToggle";
import SidebarToggle from "#/ui/toggles/SidebarToggle";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <header className="sticky top-0 z-40 h-16 w-full flex-none border-b border-slate-300 bg-white/60 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90 dark:text-white lg:z-50">
      <div className="mx-auto h-full w-full max-w-[90rem]">
        <div className="mx-4 h-full lg:mx-0 lg:border-0 lg:px-8">
          <div className="relative flex h-full items-center">
            <span className="mr-3 w-24 flex-none overflow-hidden md:w-auto">
              <span className="sr-only">{corndocsConfig.project.name}</span>
              <Logo />
            </span>
            <div className="relative ml-auto hidden items-center lg:flex">
              <nav className="text-sm font-semibold leading-6">
                <ul className="flex h-full items-center space-x-4">
                  <li>
                    <Link
                      href="/Docs/"
                      className="block rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800"
                    >
                      Docs
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="ml-4 flex items-center space-x-2 border-l border-slate-300 pl-4 dark:border-slate-700">
                {corndocsConfig.project.github && (
                  <a
                    className={`block rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
                    href={corndocsConfig.project.github.repo}
                    rel="noreferrer"
                    target={"_blank"}
                  >
                    <Github size={20} />
                  </a>
                )}
                <DarkToggle />
              </div>
            </div>
            <div className="flex w-full justify-end lg:hidden">
              {corndocsConfig.project.github && (
                <a
                  className={`block rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
                  href={corndocsConfig.project.github.repo}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  <Github size={20} />
                </a>
              )}
              <DarkToggle />
              <SidebarToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
