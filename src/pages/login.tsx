import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);
  return user ? null : (
    <div className="mx-auto max-w-lg pt-4">
      <Auth providers={["google"]} supabaseClient={supabaseClient} />
    </div>
  );
}
