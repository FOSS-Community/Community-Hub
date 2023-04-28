import { Home } from "lucide-react";
import Link from "next/link";

const Breadcrumb = ({ data }: any) => {
  return (
    <div
      className={`not-prose order-first mb-4 inline-flex h-4 flex-row items-center space-x-2 text-sm font-semibold text-slate-500 dark:text-white md:sticky`}
    >
      <Link
        href={"/Docs"}
        className="flex flex-row gap-1 hover:text-slate-600 hover:dark:text-slate-200"
      >
        <>
          <Home className="h-4 w-4" />
          Home
        </>
      </Link>
      {data &&
        data.map((item: string, index: number) => {
          return (
            <div className="flex flex-row gap-2" key={index}>
              <div>/</div>
              <Link
                href={`/Docs/${data.slice(0, index + 1).join("/")}`}
                className={`${
                  index == data.length - 1 && "font-black text-primary-500"
                }`}
              >
                {item}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
