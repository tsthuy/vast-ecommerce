import React, { ComponentType, ReactNode } from "react";
import { AppProps } from "next/app";
import { Inter, Poppins, Quicksand, Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { Toaster } from "sonner";

import queryClient from "~/utils/query-client.util";

import "../styles/globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type PageWithLayout = AppProps["Component"] & {
  Layout?: ComponentType<{ children: ReactNode }>;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default appWithTranslation(MyApp);

const roboto = Roboto({
  weight: ["300", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
});

const quicksand = Quicksand({
  weight: ["300", "500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-quicksand",
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { locale } = router;

  const fontVariables =
    locale === "vi"
      ? `${roboto.variable} ${quicksand.variable}`
      : `${poppins.variable} ${inter.variable}`;

  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  console.log("fontVariables", fontVariables);
  return (
    <>
      <style jsx global>{`
        html {
          --font-poppins: ${poppins.style.fontFamily};
        }

        body {
        font-family: var(--font-sans);
        };
        }
      `}</style>

      <main className={`${fontVariables} overflow-hidden font-sans`}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </main>

      <Toaster position="top-center" />
    </>
  );
};
