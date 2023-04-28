"use client";

import { DarkmodeContext } from "#/context/darkmodeContext";
import Copy from "#/ui/markdown/nav/Button/Copy";
import Dark from "#/ui/markdown/nav/Button/Dark";
import {
  ComputerScreen,
  PhoneScreen,
  TabletScreen,
} from "#/ui/markdown/nav/Button/Size";
import Responsive from "#/ui/markdown/Responsive";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import React, { useContext, useEffect, useState } from "react";
import CodeblockSkeleton from "../loaders/skeleton/Codeblock";

interface CodeBlockProps {
  children: React.ReactElement;
}

const CodeBlock = ({ children }: CodeBlockProps) => {
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);

  const [dark, setDark] = useState(darkmode);
  const [size, setSize] = useState<number>(1500);
  const [language, setLanguage] = useState<string>(
    children.props.className ?? "language-bash"
  );
  const [preview, setPreview] = useState<boolean>(false);
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    Prism.highlightAll();
  }, [language]);

  useEffect(() => {
    if (!children.props.classname) return;
    if (children.props.className.includes("preview")) {
      setPreview(true);
      setLanguage(children.props.className.replace("-preview", ""));
    }
  }, []);

  if (!language) {
    return <CodeblockSkeleton preview={true} />;
  }

  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
      {preview && (
        <div className="border-b border-slate-300 dark:border-slate-700">
          <Responsive size={size} dark={dark}>
            {children.props.children}
          </Responsive>
        </div>
      )}
      <div className="flex h-10 w-full items-center justify-between gap-4 border-b border-slate-300 py-1 px-4 dark:border-slate-700 dark:text-white">
        <p className="border-r border-slate-300 pr-4 text-sm font-bold capitalize dark:border-slate-700">
          {language.replace("language-", "")}
        </p>
        <nav className="relative flex h-full flex-1 flex-row items-center gap-2">
          {preview && (
            <>
              <div className="flex h-full w-full flex-row items-center gap-2">
                <PhoneScreen size={size} setSize={(e) => setSize(e)} />
                <TabletScreen size={size} setSize={(e) => setSize(e)} />
                <ComputerScreen size={size} setSize={(e) => setSize(e)} />
              </div>
              <Dark dark={dark} setDark={() => setDark(!dark)} />
              <Copy text={children.props.children} />
            </>
          )}
        </nav>
      </div>
      <div className="relative">
        <pre
          className={` ${language} line-numbers h-full max-h-[48rem] w-full overflow-auto`}
        >
          <code className={`${language} line-numbers`}>{children}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
