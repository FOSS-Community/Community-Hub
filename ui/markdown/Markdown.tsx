import CodeBlock from "#/ui/markdown/Codeblock";
import { H1, H2, H3 } from "#/ui/markdown/Headings";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dist/shared/lib/dynamic";
import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug-custom-id";
import remarkImageDimension from "#/plugins/setImageDimensions";
import Images from "#/ui/markdown/Images";

type Post = {
  serialized: MDXRemoteSerializeResult;
};

const MdxComponents = {
  pre: CodeBlock,
  h1: H1,
  h2: H2,
  h3: H3,
  img: Images,
  DisplayComponents: dynamic(async () => {
    const component = await import("#/customComponents/main");
    return component;
  }),
};

async function cerealize(raw: string): Promise<Post> {
  const serialized = await serialize(raw, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [slug],
      remarkPlugins: [remarkImageDimension, remarkGfm],
      format: "detect",
    },
  });

  return { serialized };
}

export default function Markdown({ article }: { article: string }) {
  const [cereal, setCereal] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    (async () => {
      const { serialized } = await cerealize(article);
      setCereal(serialized);
    })();
  }, [article]);

  return (
    cereal && (
      // @ts-ignore
      <MDXRemote {...cereal} components={MdxComponents} />
    )
  );
}
