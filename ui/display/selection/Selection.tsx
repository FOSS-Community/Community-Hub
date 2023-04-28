import { FoldersProps } from "#/pages/api/article";
import PreviewArticle from "#/ui/display/selection/preview/PreviewArticle";
import PreviewFolder from "#/ui/display/selection/preview/PreviewFolder";
import Breadcrumb from "#/ui/layout/breadcrumb/Breadcrumb";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface SelectionProps {
  breadcrumb?: boolean;
  data: FoldersProps[];
}

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const Selection = ({ data, breadcrumb = true }: SelectionProps) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.75, type: "spring" }}
        className="h-full w-full py-6"
      >
        {breadcrumb && <Breadcrumb data={router.query.slug} />}
        <section className="grid h-full w-full grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          {data
            .sort((a: any, b: any) => a.metadata.position - b.metadata.position)
            .map((item: any) =>
              item.type != "directory" ? (
                <PreviewArticle
                  path={item.path}
                  key={item.name}
                  slug={item.name}
                  title={item.metadata.title ?? item.name}
                  description={item.metadata.description}
                  imageUrl={item.metadata.banner}
                  date={item.metadata.date}
                />
              ) : (
                <PreviewFolder
                  key={item.name}
                  slug={item.name}
                  path={item.path}
                  title={item.metadata.title ?? item.name}
                  imageUrl={item.metadata.banner}
                  count={item.children.length}
                />
              )
            )}
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default Selection;
