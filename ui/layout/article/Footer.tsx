interface Props {
  children: React.ReactChild | null;
}

export default function ArticleFooter({ children }: Props) {
  return (
    <footer
      className="
      grid grid-cols-12 items-center gap-4 border-t bg-white p-6
      dark:border-slate-700 dark:bg-slate-900 dark:text-white
      "
    >
      <div className="col-span-12">{children}</div>
    </footer>
  );
}
