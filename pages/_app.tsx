import { CommandProvider } from "#/context/commandContext";
import { DarkmodeProvider } from "#/context/darkmodeContext";
import { SidebarProvider } from "#/context/sidebarContext";
import "#/styles/globals.css";
import "#/styles/prism.css";
import "#/styles/progress.css";
import Layout from "#/ui/layout/Layout";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CommandProvider>
        <SidebarProvider>
          <DarkmodeProvider>
            <Layout font={font.className}>
              <Component {...pageProps} />
            </Layout>
          </DarkmodeProvider>
        </SidebarProvider>
      </CommandProvider>
    </>
  );
}

export default MyApp;
