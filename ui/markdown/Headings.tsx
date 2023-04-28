import React, { ReactNode } from "react";

interface HeadingProps {
  children?: ReactNode;
  id: string;
}

export const H1 = ({ id, children }: HeadingProps) => {
  return (
    <h1 className={`group relative flex items-center`} id={id}>
      <a
        href={`#${id}`}
        className={`absolute -left-8 hidden place-content-center rounded-lg border border-slate-300 px-1.5 py-0 text-base font-bold no-underline opacity-0 transition-all group-hover:opacity-100 dark:border-slate-700 md:grid`}
      >
        #
      </a>
      {children}
    </h1>
  );
};

export const H2 = ({ id, children }: HeadingProps) => {
  return (
    <h2 className={`group relative flex items-center`} id={id}>
      <a
        href={`#${id}`}
        className={`absolute -left-8 hidden place-content-center rounded-lg border border-slate-300 px-1.5 py-0 text-base font-bold no-underline opacity-0 transition-all group-hover:opacity-100 dark:border-slate-700 md:grid`}
      >
        #
      </a>
      {children}
    </h2>
  );
};

export const H3 = ({ id, children }: HeadingProps) => {
  return (
    <h3 className={`group relative flex items-center`} id={id}>
      <a
        href={`#${id}`}
        className={`absolute -left-8 hidden place-content-center rounded-lg border border-slate-300 px-1.5 py-0 text-base font-bold no-underline opacity-0 transition-all group-hover:opacity-100 dark:border-slate-700 md:grid`}
      >
        #
      </a>
      {children}
    </h3>
  );
};

export const H4 = ({ id, children }: HeadingProps) => {
  return (
    <h4 className={`group relative flex items-center`} id={id}>
      <a
        href={`#${id}`}
        className={`absolute -left-8 hidden place-content-center rounded-lg border border-slate-300 px-1.5 py-0 text-base font-bold no-underline opacity-0 transition-all group-hover:opacity-100 dark:border-slate-700 md:grid`}
      >
        #
      </a>
      {children}
    </h4>
  );
};
