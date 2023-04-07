import { serve } from "http/server.ts";
import { ChatOpenAI } from "langchain/chat_models";
import { LLMChain } from "langchain/chains";
import { CallbackManager } from "langchain/callbacks";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";

import { corsHeaders } from "../_shared/cors.ts";

const prompt = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { input } = await req.json();
    const streaming = req.headers.get("accept") === "text/event-stream";

    if (streaming) {
      const encoder = new TextEncoder();
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();

      const llm = new ChatOpenAI({
        streaming,
        callbackManager: CallbackManager.fromHandlers({
          handleLLMNewToken: async (token) => {
            await writer.ready;
            await writer.write(encoder.encode(`data: ${token}\n\n`));
          },
          handleLLMEnd: async () => {
            await writer.ready;
            await writer.close();
          },
          handleLLMError: async (e) => {
            await writer.ready;
            await writer.abort(e);
          },
        }),
      });
      const chain = new LLMChain({ prompt, llm });
      chain.run(input).catch((e) => console.error(e));

      return new Response(stream.readable, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    } else {
      const llm = new ChatOpenAI();
      const chain = new LLMChain({ prompt, llm });
      const response = await chain.run(input);

      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
