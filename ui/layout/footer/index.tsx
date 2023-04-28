import corndocsConfig from "#/corndocs.config.js";
import React from "react";

interface FooterProps {
  children?: React.ReactChild;
}

function Footer({ children }: FooterProps) {
  return (
    <footer className="flex w-full justify-center border-t border-slate-300 p-4 py-6 dark:border-slate-700">
      <div className="flex w-full max-w-7xl flex-row items-center justify-between">
        <p className="text-center text-sm font-bold sm:text-left">
          © 2022 {corndocsConfig.project.name}
        </p>
        {children}
      </div>
    </footer>
  );
}

export default Footer;
