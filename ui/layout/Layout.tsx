import { DarkmodeContext } from "#/context/darkmodeContext";
import { SidebarContext } from "#/context/sidebarContext";
import Nav from "#/ui/layout/nav/Nav";
import Sidebar from "#/ui/layout/sidebar/Sidebar";
import React, { useContext, useEffect } from "react";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  font: any;
}

function Layout({ children, font }: LayoutProps) {
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);
  /* @ts-ignore */
  const { sidebar } = useContext(SidebarContext);

  return (
    <div className={`${darkmode && "dark"} ${font}`}>
      <div className="relative flex min-h-screen w-full flex-col items-center dark:bg-slate-900">
        <Nav />
        <div className="z-10 w-full max-w-[90rem] flex-1 px-4 sm:px-6 md:px-8">
          <Sidebar />
          <main className={`${sidebar && "lg:pl-[19.5rem]"}`}>{children}</main>
        </div>
        <div className="fixed inset-0 overflow-hidden">
          <div
            style={{ left: "max(0px,calc(50% - 45rem))" }}
            className="radial absolute top-0 bottom-0 left-0 aspect-square w-full -translate-x-1/2 -translate-y-1/2 opacity-[0.15]"
          />
        </div>
      </div>
    </div>
  );
}

export default Layout;
