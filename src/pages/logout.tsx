import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.signOut().then(
      () => {
        router.replace("/login");
      },
      (err) => {
        // This happens when user no longer exists in the database
        console.error(err);
        router.replace("/login");
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
