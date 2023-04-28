import corndocsConfig from "#/corndocs.config.js";
import Image from "next/image";
import Link from "next/link";
import { DarkmodeContext } from "#/context/darkmodeContext";
import { useContext } from "react";

export default function Logo() {
  const { logo } = corndocsConfig.project;
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <Link
      href="/"
      className="display flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black"
    >
      <>
        {logo && (
          <span className="relative grid h-10 place-items-center overflow-hidden">
            <Image
              style={{ objectFit: "contain", objectPosition: "center" }}
              src={darkmode && logo.darkMode ? logo.darkMode : logo.src}
              alt={logo.alt}
              width={logo?.size?.[0] ? logo.size[0] : 80}
              height={logo?.size?.[1] ? logo.size[1] : 40}
            />
          </span>
        )}
        <span className="hidden md:inline-block">
          {corndocsConfig.project.name}
        </span>
      </>
    </Link>
  );
}
