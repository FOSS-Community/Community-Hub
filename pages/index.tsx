import Markdown from "#/ui/markdown/Markdown";
import Selection from "#/ui/display/selection/Selection";
import { FoldersProps, getAllPosts } from "./api/article";
import { getCertainPost } from "./api/article/[...slug]";
import corndocsConfig from "#/corndocs.config";
import SearchButton from "#/ui/layout/sidebar/Search";
import Link from "next/link";

interface Props {
  data: {
    content: {
      title?: string;
      tagLine?: string;
      markdown?: string;
    };
    selection?: FoldersProps[];
  };
}

export async function getStaticProps() {
  let markdownContent: string = "";
  let selection: FoldersProps[] = [];

  let title;
  let tagLine;

  if (corndocsConfig.project.mainScreen.homePage.custom?.path) {
    let temp = (await getCertainPost("index")) as FoldersProps;
    if (temp.content) {
      markdownContent = temp.content;
    }
  }

  if (corndocsConfig.project.mainScreen.homePage.title) {
    title = corndocsConfig.project.mainScreen.homePage.title;
  }

  if (corndocsConfig.project.mainScreen.homePage.tagLine) {
    tagLine = corndocsConfig.project.mainScreen.homePage.tagLine;
  }

  if (corndocsConfig.project.mainScreen.showSelection) {
    selection = (await getAllPosts()) as FoldersProps[];
  }

  return {
    props: {
      data: {
        content: {
          title: title,
          tagLine: tagLine,
          markdown: markdownContent,
        },
        selection: selection,
      },
    },
  };
}

function Home({ data }: Props) {
  return (
    <article className="not-prose w-full max-w-none pt-8">
      <section className="not-prose md:py-18 relative mx-auto max-w-6xl py-8 px-6">
        {data.content.markdown ? (
          <Markdown article={data.content.markdown} />
        ) : (
          <>
            <h1 className="2xl:px-30 mb-4 text-4xl font-black text-slate-900 dark:text-white md:text-6xl lg:mb-8 lg:text-center lg:leading-tight">
              {data.content.title}
            </h1>
            <p className="font-bold text-slate-600 dark:text-slate-100 lg:text-center lg:text-lg">
              {data.content.tagLine}
            </p>
          </>
        )}
      </section>
      {corndocsConfig.project.mainScreen.showSearch && (
        <div className="mx-auto flex max-w-xl flex-col justify-center gap-2 py-8 md:flex-row">
          <SearchButton />
          <Link
            href="/Docs/getting-started"
            className="flex h-10 min-w-[6rem] flex-none items-center justify-center whitespace-nowrap rounded-xl bg-primary-500 px-6 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-primary-600 dark:ring-offset-slate-800 dark:hover:bg-primary-500"
          >
            Get Started
          </Link>
        </div>
      )}
      {data.selection && <Selection data={data.selection} breadcrumb={false} />}
    </article>
  );
}

export default Home;
