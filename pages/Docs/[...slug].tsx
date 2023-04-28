import corndocsConfig from "#/corndocs.config";
import { getPostSlugs } from "#/scripts/paths-generator";
import Article from "#/ui/display/article/Article";
import Selection from "#/ui/display/selection/Selection";
import { NextSeo } from "next-seo";
import React from "react";
import { getCertainPost } from "../api/article/[...slug]";

export async function getStaticPaths() {
  const paths = await getPostSlugs();

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string[] } }) {
  const slug = context.params.slug;
  const data = await getCertainPost(slug.join("/"));

  return {
    props: {
      slug: slug.join("/"),
      data: data,
    },
  };
}

interface Props {
  slug: string;
  data: any;
}

function Doc({ data, slug }: Props) {
  if (!data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-16">
        <h1 className="rounded-xl bg-primary-200/20 p-4 text-9xl font-black text-primary-500">
          404
        </h1>
        <div className="text-center text-xl text-slate-900 dark:text-white">
          <p>
            Looks like the documentation for{" "}
            <span className="font-bold">{slug}</span> is nowhere to be found!
          </p>
          <p>Try looking for something else.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NextSeo
        title={`${data.metadata.title ?? data.name}${
          data.children
            ? ` ( ${data.children.length} ${
                data.children.length > 1 ? "sub-items" : "sub-item"
              } )`
            : ""
        }`}
        description={data.metadata.description}
        openGraph={{
          url: corndocsConfig.project.url + data.path,
          title: data.metadata.title ?? data.name,
          description: data.metadata.description,
          images: [
            {
              url: `${data.metadata.banner ? `${data.metadata.banner}` : ""}`,
              alt: data.metadata.description,
            },
          ],
          siteName: corndocsConfig.project.name,
        }}
      />
      {data.children ? (
        <Selection data={data.children} />
      ) : (
        <Article data={data} />
      )}
    </>
  );
}

export default Doc;
