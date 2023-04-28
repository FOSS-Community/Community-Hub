/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { DarkmodeContext } from "#/context/darkmodeContext";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useContext } from "react";

interface ImageProps {
  src: string;
  alt: string;
  style: {
    width?: number;
    height?: number;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  };
}

export default function Images(props: ImageProps) {
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <img className="rounded-xl" {...props} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1000] grid place-content-center bg-slate-900/50" />
        <Dialog.Content
          className={`${
            darkmode ? "dark" : ""
          } fixed inset-0 z-[1001] m-2 md:m-16`}
        >
          <Dialog.Title className="text-xl font-bold text-white">
            {props.alt}
          </Dialog.Title>
          <div className="dotty relative h-auto w-full overflow-hidden rounded-xl border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800 md:h-full">
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 z-40 rounded-xl bg-rose-500 p-2 text-white hover:bg-rose-600"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </Dialog.Close>
            <img
              className="h-full w-full rounded-xl object-contain object-center"
              alt={props.alt}
              src={props.src}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
