// import "https://deno.land/x/xhr@0.2.1/mod.ts"; // for openai>axios
import { serve } from "http/server.ts";
import { ChatOpenAI } from "langchain/chat_models";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";

const prompt = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

serve(async (req) => {
  const { input } = await req.json();

  const llm = new ChatOpenAI();
  const chain = new LLMChain({ prompt, llm });
  const response = await chain.run(input);

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
});
