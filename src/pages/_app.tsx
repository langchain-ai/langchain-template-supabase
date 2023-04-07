import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default function AppWrapper(props: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={props.pageProps.initialSession}
    >
      <App {...props} />
    </SessionContextProvider>
  );
}
