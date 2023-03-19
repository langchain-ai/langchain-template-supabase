import "https://deno.land/x/xhr@0.2.1/mod.ts"; // for openai>axios
import { jsonResponse, serveWithAuth } from "../_shared/serve.ts";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { SupabaseVectorStore } from "langchain/vectorstores";

// https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/file-upload-storage/index.ts

serveWithAuth(async (req, _, supabase) => {
  const store = new SupabaseVectorStore(supabase, new OpenAIEmbeddings());

  console.log("store", store);

  return jsonResponse({ hello: 1 });
});
