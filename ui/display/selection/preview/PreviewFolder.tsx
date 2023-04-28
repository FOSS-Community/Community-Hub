import Layout from "#/ui/display/selection/preview/Layout";
import Image from "next/image";
import React, { useState } from "react";

interface PreviewProps {
  title: string;
  count: number;
  slug: string;
  path: string;
  imageUrl: string;
  displayIcons?: boolean;
}

export default function PreviewFolder(props: PreviewProps) {
  const { title, slug, count, path, imageUrl, displayIcons = true } = props;
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <Layout
      title={title}
      description={`${count} Sub-Item${count > 1 ? "s" : ""}`}
      path={path}
    >
      <>
        {imageUrl && (
          <Image
            style={{ objectFit: "cover", objectPosition: "center" }}
            fill={true}
            src={`${imageUrl}`}
            alt={`This is a folder of ${count} components`}
            onError={() => {
              setFallbackImage(true);
            }}
          />
        )}
        {displayIcons && (
          <div className="absolute grid w-full grid-cols-4 gap-1 overflow-hidden p-2">
            {[...Array(count)].map((item: string, index: number) => (
              <div
                key={index}
                className="h-16 w-full rounded-xl bg-slate-300/80 backdrop-blur-md dark:bg-slate-600/80 md:h-10"
              ></div>
            ))}
          </div>
        )}
      </>
    </Layout>
  );
}
