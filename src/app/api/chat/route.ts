import { buildLocalAnswer, buildSystemPrompt } from "@/lib/knowledge";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatRequest = {
  messages: ChatMessage[];
};

async function askOpenAI(messages: ChatMessage[]): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 280,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...messages.slice(-8)],
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return data.choices?.[0]?.message?.content?.trim() || null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const messages = body.messages?.filter((m) => m.content?.trim()) ?? [];

    if (messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return Response.json({ error: "No user message" }, { status: 400 });
    }

    const llmAnswer = await askOpenAI(messages);

    if (llmAnswer) {
      return Response.json({
        answer: llmAnswer,
        mode: "llm",
      });
    }

    const local = buildLocalAnswer(lastUser.content);

    return Response.json({
      answer: local.answer,
      sources: local.sources,
      mode: "local",
    });
  } catch {
    return Response.json({ error: "Unable to process chat request" }, { status: 500 });
  }
}
