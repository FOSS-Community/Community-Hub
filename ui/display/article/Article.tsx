import corndocsConfig from "#/corndocs.config.js";
import { FoldersProps } from "#/pages/api/article";
import ArticleFooter from "#/ui/layout/article/Footer";
import ArticleNavigation from "#/ui/layout/article/Navigation";
import ArticleSidebar from "#/ui/layout/article/Sidebar";
import Breadcrumb from "#/ui/layout/breadcrumb/Breadcrumb";
import Markdown from "#/ui/markdown/Markdown";
import { AnimatePresence, motion } from "framer-motion";
import { Github } from "lucide-react";
import { useRouter } from "next/router";

const variants = {
  hidden: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 1 },
};

export default function Article({ data }: { data: FoldersProps }) {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.75, type: "spring" }}
        className="md:pl-2"
      >
        <main>
          <div className="container mx-auto py-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <div className="flex grid-cols-12 flex-col-reverse xl:grid xl:gap-7">
                  <div className="col-span-12 xl:col-span-9">
                    <Breadcrumb data={router.query.slug} />
                    <article className="prose prose-slate w-full max-w-none dark:prose-invert">
                      {data.content && <Markdown article={data.content} />}
                    </article>
                    <ArticleNavigation />
                  </div>
                  {data.headings && data.headings.length > 0 && (
                    <ArticleSidebar
                      headings={data.headings.filter(
                        (item) => item.level <= 3 && item.level > 1
                      )}
                    >
                      {corndocsConfig.project.github ? (
                        <div className="mt-10 border-t border-slate-300 pt-4 dark:border-slate-700">
                          <a
                            className="flex items-center gap-2 text-xs font-bold"
                            target="_blank"
                            rel="noreferrer"
                            href={`${corndocsConfig.project.github.repo}/edit/${
                              corndocsConfig.project.github.usesMain
                                ? "main"
                                : "master"
                            }/_posts/${data.path}.${data.extension}`}
                          >
                            <Github size={12} />
                            <span>Edit on GitHub</span>
                          </a>
                        </div>
                      ) : null}
                    </ArticleSidebar>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
