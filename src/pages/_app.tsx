import "@/styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default function AppWithAuth(props: AppProps) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [supabaseClient] = useState(
    () => createBrowserSupabaseClient() // TODO pass Database type
  );

  useEffect(() => {
    async function init() {
      supabaseClient.auth;
      const { data } = await supabaseClient.auth.getSession();
      if (!data || !data.session) {
        router.replace("/login");
      }
      setAuthed(data.session ? true : false);
    }
    init().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient]);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={props.pageProps.initialSession}
    >
      {authed !== null ? <App {...props} /> : null}
    </SessionContextProvider>
  );
}
