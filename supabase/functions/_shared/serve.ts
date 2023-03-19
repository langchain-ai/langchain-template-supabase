import { serve, ServeInit, ConnInfo } from "http/server.ts";
import { User } from "@supabase/supabase-js";
import { createClient } from "./supabase-client.ts";

type SupabaseHandler = (
  req: Request,
  connInfo: ConnInfo,
  supabaseClient: ReturnType<typeof createClient>,
  user: User
) => Promise<Response>;

export function serveWithAuth(handler: SupabaseHandler, options?: ServeInit) {
  return serve(async (req: Request, connInfo: ConnInfo) => {
    try {
      // Create a Supabase client with the Auth context of the logged in user.
      const supabaseClient = createClient(req);

      // Now we can get the session or user object
      // const {
      //   data: { user },
      //   error,
      // } = await supabaseClient.auth.getUser();

      // if (error) {
      //   throw error;
      // }

      // if (!user) {
      //   return new Response(JSON.stringify({ error: "Unauthorized" }), {
      //     headers: { "Content-Type": "application/json" },
      //     status: 401,
      //   });
      // }

      return await handler(req, connInfo, supabaseClient, {} as any);
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
  }, options);
}

// deno-lint-ignore no-explicit-any
export const jsonResponse = (data: any) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
