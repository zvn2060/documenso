import "../styles/tailwind.css";
import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: any) => page);
  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps} />{" "}
    </SessionProvider>
  );
}