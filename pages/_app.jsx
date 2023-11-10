import "@/styles/globals.css";
import { QuioscoProvider } from "@/context/QuioscoProvider";
import { SessionProvider } from "next-auth/react";

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <QuioscoProvider>
        <Component {...pageProps} />
      </QuioscoProvider>
    </SessionProvider>
  );
}
