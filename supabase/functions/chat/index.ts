import "https://deno.land/x/xhr@0.2.1/mod.ts"; // for openai>axios
import { jsonResponse, serveWithAuth } from "../_shared/serve.ts";
import { ChatOpenAI } from "langchain/chat_models";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { SupabaseVectorStore } from "langchain/vectorstores";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";

// https://github.com/supabase/supabase/pull/12056/commits/bd83e9ba2f7263440888228e3b29007604d94841#diff-d0d4ed229ccc7b858c1022370a3fddd62359b4fef4b4042b83e91ff53520dad8

const template = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate("Hello, how are you?"),
]);

serveWithAuth(async (req, _, supabase) => {
  const model = new ChatOpenAI();

  const response = await model.callPrompt(await template.formatPromptValue({}));

  const store = new SupabaseVectorStore(supabase, new OpenAIEmbeddings());

  return jsonResponse(response);
});
